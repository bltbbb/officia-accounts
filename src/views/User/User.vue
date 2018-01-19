<template>
    <div class="user-wrapper">
      <div class="avatar">
        <div class="img-wrapper" @click="startEdite">
          <img :src="option.img" alt="">
        </div>
      </div>
      <div class="avatar-dialog">
        <el-dialog
          title="更改头像"
          :visible.sync="dialogVisible"
          width="350px">
          <div class="uploadBtn-wrapper">
            <label class="uploadsBtn el-button" for="uploads">上传本地照片</label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
          </div>
          <div class="edite-wrapper">
            <vueCropper
              v-if="dialogVisible"
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="false"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              @realTime="realTime"
            ></vueCropper>
          </div>
          <div class="s-icon">
            <i style="font-size: 30px;" @click="rotateLeft" class="el-icon-acc-xuanzhuanleft"></i>
            <i style="font-size: 30px;" @click="rotateRight" class="el-icon-acc-xuanzhuanright"></i>
          </div>
          <div class="show-preview" style="border-radius: 50%" v-if="false" >
            <div :style="previews.div">
              <img :src="previews.url" style="position: relative;" :style="previews.img">
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="upLoadAvatar">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="userInfo">
        <el-form ref="form" :model="form" label-width="60px">
          <el-form-item label="名称">
            <el-input v-model="form.serviceName" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="form.describe" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    import vueCropper from '@/components/vue-cropper'
    import '../../utils/spark-md5'
    export default {
        data(){
            return {
              dialogVisible: false,
              previews: {},
              option: {
                img: '/static/img/avatar.3df55f3.jpg',
                size: 1,
                full: false,
                outputType: 'png',
                canMove: true,
                fixedBox: true,
                original: false,
                canMoveBox: false,
                autoCrop: true,
                autoCropWidth: 200,
                autoCropHeight: 200,
              },
              md5:'',
              form:{}
            }
        },
        mounted(){
          this.getUserInfo()
        },
        methods: {
          getUserInfo(){
            this.$http.get('/serviceInfoConfig').then( (res) => {
                let data = res.data.result
                this.form = data
                data.picturePath ? this.option.img = data.picturePath : '/static/img/avatar.3df55f3.jpg'
            })
          },
          startEdite(){
            this.dialogVisible = true
          },
          realTime (data) {
            this.previews = data
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

              this.option.img = data
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
            this.$refs.cropper.refresh()
          },
          upLoadAvatar(blob){
            // 输出
            this.$refs.cropper.getCropBlob((data) => {
              var reader = new FileReader();
              var spark = new SparkMD5();
              let file = reader.readAsArrayBuffer(data);
              reader.onload = (e) => {
                spark.append(reader.result)
                this.md5 = spark.end()
                let formdata = new FormData();
                let id = 123
                formdata.append('file',data,'avatar.png');
                let config = {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'shouldQs':false                    
                  }
                };
                this.$http.post('/serviceInfoConfig/picture?id='+id+'&md5='+this.md5, formdata, config).then( (res) => {
                })
              }
            })
          },
          rotateLeft(){
            this.$refs.cropper.rotateLeft()
          },
          rotateRight(){
            this.$refs.cropper.rotateRight()
          },
          cancel(){
            this.dialogVisible = false
            this.option.img =  'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
          }
        },
        components:{
          vueCropper
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .user-wrapper {
    .avatar {
      text-align: center;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      .img-wrapper {
        width: 120px;
        height: 120px;
        cursor: pointer;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }
    .avatar-dialog {
      .edite-wrapper {
        width: 200px;
        height: 200px;
        margin: 0 auto;
      }
      .el-dialog__body {
        padding: 0;
      }
      .show-preview {
        width:200px;
        height:200px;
        overflow: hidden;
        margin: 5px;
      }
      .uploadsBtn {
        margin-bottom: 15px;
      }
      .s-icon {
        text-align: center;
        margin-top: 15px;
        cursor: pointer;
      },
      .uploadBtn-wrapper {
        text-align: left;
        padding-left: 55px;
        margin-top: 15px;
      }
    }

  }
</style>
<style lang="scss">
  .avatar-dialog {
    .el-dialog__body {
      padding-top: 0;
    }
  }
</style>
