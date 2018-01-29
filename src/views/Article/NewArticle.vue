<template>
    <div class="new-article">
      <div class="left">
        <h4>文章列表</h4>
        <div class="list-wrapper">
          <div class="list-item" :class="{active:index == 0}" @click="index = 0">
            <div class="list-img-cover" v-if="form0.cover">
              <img class="list-img" :src="form0.cover" alt="">
              <span v-if="!form0.title">标题</span>
              <span v-if="form0.title">{{form0.title}}</span>
            </div>
            <div class="list-cover" v-if="!form0.cover">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
              <span v-if="!form0.title">标题</span>
              <span v-if="form0.title">{{form0.title}}</span>
            </div>
          </div>
          <div class="list-item list-item-small" :class="{active:index == 1}" v-if="count >= 2" @click="index = 1">
            <span v-if="!form1.title">标题</span>
            <span v-if="form1.title">{{form1.title}}</span>
            <div class="list-img" v-if="form1.cover">
              <img :src="form1.cover" alt="">
            </div>
            <div class="list-cover" v-if="!form1.cover">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
            </div>
          </div>
          <div class="list-item list-item-small" :class="{active:index == 2}" v-if="count >= 3" @click="index = 2">
            <span v-if="!form1.title">标题</span>
            <span v-if="form1.title">{{form1.title}}</span>
            <div class="list-img" v-if="form1.cover">
              <img :src="form1.cover" alt="">
            </div>
            <div class="list-cover" v-if="!form1.cover">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
            </div>
          </div>
          <div class="list-item list-item-small" :class="{active:index == 3}" v-if="count >= 4" @click="index = 3">
            <span v-if="!form1.title">标题</span>
            <span v-if="form1.title">{{form1.title}}</span>
            <div class="list-img" v-if="form1.cover">
              <img :src="form1.cover" alt="">
            </div>
            <div class="list-cover" v-if="!form1.cover">
              <img src="http://125.208.1.67:6003/file/download/895b0021-2554-4784-b992-bf417f7229bd.png" alt="">
            </div>
          </div>
          <div class="list-add" @click="addArticleList" v-if="count < 4">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <div class="middle"></div>
      <div class="right">
        <el-form ref="form" :model="form0" status-icon label-width="100px" label-position="left" v-if="index == 0" :rules="rules">
          <el-form-item label="类型">
            <el-radio-group v-model="form0.target">
              <el-radio-button label="1">富文本</el-radio-button>
              <el-radio-button label="2">链接</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form0.title" :maxlength="50" @change="titleChange" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="正文链接" prop="urlPath">
            <el-input v-model="form0.urlPath" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图" prop="cover">
            <div class="chooseImage" @click="toggleShow"><i v-if="!form0.cover" class="el-icon-plus avatar-uploader-icon"></i><img class="filePic" :src="form0.cover" v-if="form0.cover" alt="">
            </div>
            <!--<input type="file" id="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">-->
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" :autosize="{ minRows: 6}" v-model="form0.summary" style="width: 350px"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" v-bind:value="`'form'+${count}`" label-width="100px" label-position="left" v-if="index == 1">
          <el-form-item label="类型">
            <el-radio-group v-model="form1.target">
              <el-radio-button label="1">富文本</el-radio-button>
              <el-radio-button label="2">链接</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form1.title" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="正文链接">
            <el-input v-model="form1.urlPath" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图">
            <div class="chooseImage chooseImage2" @click="toggleShow2"><i v-if="!form1.cover" class="el-icon-plus avatar-uploader-icon"></i><img class="filePic" :src="form1.cover" v-if="form1.cover" alt="">
            </div>
            <!--<input type="file" id="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">-->
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" :autosize="{ minRows: 6}" v-model="form1.summary" style="width: 350px"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form2" label-width="100px" label-position="left" v-if="index == 2">
          <el-form-item label="类型">
            <el-radio-group v-model="form2.target">
              <el-radio-button label="1">富文本</el-radio-button>
              <el-radio-button label="2">链接</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form2.title" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="正文链接">
            <el-input v-model="form2.urlPath" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图">
            <div class="chooseImage chooseImage2" @click="toggleShow2"><i v-if="!form2.cover" class="el-icon-plus avatar-uploader-icon"></i><img class="filePic" :src="form2.cover" v-if="form2.cover" alt="">
            </div>
            <!--<input type="file" id="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">-->
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" :autosize="{ minRows: 6}" v-model="form2.summary" style="width: 350px"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form3" label-width="100px" label-position="left" v-if="index == 3">
          <el-form-item label="类型">
            <el-radio-group v-model="form3.target">
              <el-radio-button label="1">富文本</el-radio-button>
              <el-radio-button label="2">链接</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form3.title" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="正文链接">
            <el-input v-model="form3.urlPath" style="width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="上传封面图">
            <div class="chooseImage chooseImage2" @click="toggleShow2"><i v-if="!form3.cover" class="el-icon-plus avatar-uploader-icon"></i><img class="filePic" :src="form3.cover" v-if="form3.cover" alt="">
            </div>
            <!--<input type="file" id="chooseImage" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">-->
          </el-form-item>
          <el-form-item label="摘要">
            <el-input type="textarea" :autosize="{ minRows: 6}" v-model="form3.summary" style="width: 350px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="button-group">
        <el-button-group>
          <el-button type="primary">返回</el-button>
          <el-button type="primary" @click="saveArticle">保存草稿</el-button>
          <el-button type="primary">预览</el-button>
          <el-button type="primary" @click="pushArticle">发布</el-button>
        </el-button-group>
      </div>
      <my-upload field="img"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :noCircle="true"
                 :range="true"
                 :width="213"
                 :height="116"
                 ref="uploadCroper"
                 url="http://192.168.1.21:9969/materialInfoImage"
                 :params="params"
                 :headers="headers"
                 img-format="png"></my-upload>
      <my-upload field="img"
                 @crop-success="cropSuccess2"
                 @crop-upload-success="cropUploadSuccess2"
                 @crop-upload-fail="cropUploadFail2"
                 v-model="show2"
                 :noCircle="true"
                 :range="true"
                 :width="110"
                 :height="110"
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
              show2: false,
              src:'',
              rules:{},
              form0:{
                title:'',
                urlPath:'',
                target:'2',
                summary:'',
                cover: ''
              },
              form1:{
                title:'',
                urlPath:'',
                target:'2',
                summary:'',
                cover: ''
              },
              form2:{
                title:'',
                urlPath:'',
                target:'2',
                summary:'',
                cover: ''
              },
              form3:{
                title:'',
                urlPath:'',
                target:'2',
                summary:'',
                cover: ''
              },
              params: {
                token: '123456798',
                name: 'avatar'
              },
              headers: {
                adoptToken: ''
              },
              index: 0,
              count: 1
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
          toggleShow2(){
            this.show2 = true
            this.$refs.uploadCroper.refresh()
          },
          cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            //this['form'+this.index].imgDataUrl = imgDataUrl;
          },

          cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            let path = jsonData.result.result[0].path
            this['form'+this.index].cover = path;
            console.log(this['form'+this.index].cover)
            console.log('field: ' + field);
          },

          cropUploadFail(status, field){
            this.$message('上传失败')
          },
          cropSuccess2(imgDataUrl, field){
            console.log('-------- crop success --------');
            this['form'+this.index].imgDataUrl = imgDataUrl;
          },
          cropUploadSuccess2(jsonData, field){
            console.log('-------- upload success --------');
            let path = jsonData.result.result[0].path
            this['form'+this.index].cover = path;
            console.log('field: ' + field);
          },
          cropUploadFail2(status, field){
            this.$message('上传失败')
          },
          titleChange(data){
            console.log(data)
          },
          saveArticle(){
            this.$refs.form.validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                this.$message.error('请填写完整')
                return false;
              }
            });
            let arr = []
            let config = {
              headers: {
                'shouldQs':false
              }
            };
            for(let i = 1;i <= this.count;i++){
                this['form'+i].publish = 2
                this['form'+i].orderId = i
                arr.push(this['form'+i])
            }
            console.log(arr)
            let data = {
              articles: arr
            }
            this.$http.post('/serviceInfoArticles',data,config).then( (res) => {
              console.log(res)
            })
          },
          pushArticle(){
            this.rules = {
              title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 0, max: 50, message: '不能大于50字符', trigger: 'blur' }
              ],
              urlPath: [
                { required: true, message: '请输入链接地址', trigger: 'blur' },
                { type: "url", message: '请输入正确的链接', trigger: 'blur' },
              ],
              cover: [
                { required: true, message: '请上传封面图', trigger: 'blur' },
              ],
            }
          },
          addArticleList(){
              if(this.count >= 4) return
              this.count++
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .new-article {
    overflow: hidden;
    position: relative;
    .left {
      width: 270px;
      float: left;
      padding:0 20px 0 15px;

      h4 {
        text-align: center;
      }
      .list-wrapper {
        padding-top: 15px;
        .list-item {
          padding: 14px 9px;
          margin-bottom:10px;
          border: 2px solid #eee;
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
              padding: 0 15px;
              text-align: center;
              position: absolute;
              bottom:0;
              left:0;
              height: 30px;
              line-height: 30px;
              background: rgba(0,0,0,0.4);
              color: #fff;
              overflow: hidden;
              word-wrap:break-word;
              word-break: break-all;
            }
          }
          &.active {
            border: 2px solid #48b54d!important;
          }
          .list-img {
            width: 100%;
          }
          .list-img-cover {
            position: relative;
            width: 213px;
            height: 116px;
            span{
              display: block;
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
            .list-img {
              width: 100px;
              height: 100px;
              float: right;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 100%;
              }
            }
          }
        }
        .list-add {
          padding: 14px 9px;
          border: 2px dashed #eee;
          i {
            width: 213px;
            height: 100px;
            text-align: center;
            line-height:100px;
            font-size: 50px;
          }
          &:hover {
            border-color: #48b54d;
          }
        }
      }
    }
    .middle {
      float: right;
      border-right:1px solid #e7e7eb;
    }
    .right {
      float: left;
      margin-left: 50px;
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
        height:110px;
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
          height: 110px;
          line-height: 110px;
          text-align: center;
        }
      }
      .chooseImage2 {
        width: 110px;
        height:110px;
        &:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 110px;
          height: 110px;
          line-height: 110px;
          text-align: center;
        }
        img {
          width: 100%;
        }
      }
      .filePic {
        width: 200px;
        vertical-align: bottom;
      }
    }
    .button-group {
      border-top:1px solid #e7e7eb;
      margin-top: 15px;
      padding-top: 20px;
      position: relative;
      width: 100%;
      float: left;
      text-align: center;
    }
  }

</style>
