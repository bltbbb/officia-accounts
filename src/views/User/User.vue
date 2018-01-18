<template>
    <div class="user-wrapper">
      <div class="avatar">
        <div class="img-wrapper" @click="startEdite">
          <img src="../../assets/img/user.png" alt="">
        </div>
      </div>
      <div class="avatar-dialog">
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="80%">
          <div class="edite-wrapper">
            <vueCropper
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
          <div class="show-preview" style="border-radius: 50%" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <div :style="previews.div" style="position: relative;">
              <img :src="previews.url" style="position: absolute;" :style="previews.img">
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upLoadAvatar">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import vueCropper from '@/components/vue-cropper'
    export default {
        data(){
            return {
              dialogVisible: false,
              previews: {},
              option: {
                img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg',
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
              }
            }
        },
        methods: {
          startEdite(){
            this.dialogVisible = true
          },
          realTime (data) {
            this.previews = data
          },
          upLoadAvatar(blob){
            // 输出
            this.$refs.cropper.getCropBlob((data) => {
              console.log(data)
            })
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
        }
      }
    }
    .edite-wrapper {
      width: 200px;
      height: 200px;
    }
  }
</style>
