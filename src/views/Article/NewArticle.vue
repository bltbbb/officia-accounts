<template>
    <div class="new-article">
      <div class="left">
        <h4>文章列表</h4>
        <div class="list-wrapper">
          <div class="list-item active">
            <div class="list-img-cover" v-if="imgDataUrl">
              <img class="list-img" :src="imgDataUrl" alt="">
              <span>标题</span>
            </div>
            <div class="list-cover" v-if="!imgDataUrl">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
              <span>标题</span>
            </div>
          </div>
          <div class="list-item list-item-small">
            <span>标题</span>
            <div class="list-cover" v-if="!imgDataUrl">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <el-form-item label="类型">
            <el-radio-group v-model="form.radio">
              <el-radio-button label="1">富文本</el-radio-button>
              <el-radio-button label="2">链接</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="正文链接">
            <el-input v-model="form.url" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图">
            <div class="chooseImage" @click="toggleShow"><i v-if="!imgDataUrl" class="el-icon-plus avatar-uploader-icon"></i><img class="filePic" :src="imgDataUrl" v-if="imgDataUrl" alt="">
            </div>
            <!--<input type="file" id="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">-->
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" :autosize="{ minRows: 6}" v-model="form.mark" style="width: 350px"></el-input>
          </el-form-item>
          <div class="button-group">
            <el-button-group>
              <el-button type="primary">返回</el-button>
              <el-button type="primary">保存草稿</el-button>
              <el-button type="primary">预览</el-button>
              <el-button type="primary">发布</el-button>
            </el-button-group>
          </div>
        </el-form>
      </div>
      <my-upload field="img"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 @crop-upload-refresh="cropUploadRefresh"
                 v-model="show"
                 :noCircle="true"
                 :range="true"
                 :width="300"
                 :height="300"
                 ref="uploadCroper"
                 url="http://192.168.1.21:9969/materialInfoImage"
                 :params="params"
                 :headers="headers"
                 img-format="png"></my-upload>
    </div>
</template>

<script>
  import 'babel-polyfill'; // es6 shim
  import myUpload from '@/components/image-cropper.vue';

  export default {
        data(){
            return {
              show: false,
              src:'',
              form:{
                title:'',
                url:'',
                radio:'2',
                mark:''
              },
              params: {
                token: '123456798',
                name: 'avatar'
              },
              headers: {
                adoptToken: ''
              },
              imgDataUrl: ''
            }
        },
        mounted(){
          this.headers.adoptToken = this.$cookie.get('oa_adoptToken')
        },
        components: {
          'my-upload': myUpload
        },
        methods:{
          toggleShow(){
            this.show = true
            this.$refs.uploadCroper.refresh()
          },
          uploadImg(e){
            var file = e.target.files[0]

            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
              alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
              return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
              let data
              if (typeof e.target.result === 'object') {
                // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target.result]))
              } else {
                data = e.target.result
              }

              this.src = data
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
          },
          cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
          },

          cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
          },

          cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
          },
          cropUploadRefresh(){

          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .new-article {
    overflow: hidden;
    .left {
      width: 250px;
      float: left;
      padding:0 0 0 15px;
      h4 {
        text-align: center;
      }
      .list-wrapper {
        padding-top: 15px;
        .list-item {
          padding: 9px;
          margin-bottom:10px;
          .list-cover {
            padding: 40px 30px;
            background: #ececec;
            text-align: center;
            position: relative;
            img {
              width: 30%;
            }
            span {
              display: inline-block;
              width: 100%;
              text-align: center;
              position: absolute;
              bottom:0;
              left:0;
              height: 30px;
              line-height: 30px;
              background: rgba(0,0,0,0.4);
              color: #fff;
            }
          }
          &.active {
            border: 2px solid #48b54d;
          }
          .list-img {
            width: 100%;
          }
          .list-img-cover {
            position: relative;
            span{
              display: inline-block;
              width: 100%;
              text-align: center;
              position: absolute;
              bottom:0;
              left:0;
              height: 30px;
              line-height: 30px;
              background: rgba(0,0,0,0.4);
              color: #fff;
            }
          }
          &.list-item-small {
            overflow: hidden;
            border: 1px solid #eee;
            .list-cover {
              width: 100px;
              height: 100px;
              background: #ececec;
              text-align: center;
              float: right;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 30px;
              }
            }
            span {
            }
          }
        }
      }
    }
    .right {
      float: left;
      margin-left: 50px;
      border-left:1px solid #e7e7eb;
      padding-left: 35px;
      .list-cover {
        padding: 35px 25px;
        background: #ececec;
        text-align: center;
        display: inline-block;
        img {
          width: 30%;
        }
      }
      .chooseImage {
        display: inline-block;
        width: 178px;
        height:178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }
      .filePic {
        width: 200px;
        vertical-align: bottom;
      }
      .button-group {
        padding: 20px 0 30px 100px;
      }
    }
  }

</style>
