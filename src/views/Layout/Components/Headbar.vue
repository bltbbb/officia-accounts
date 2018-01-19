<template>
    <div class="headbar">
      <h1>坐标服务号平台</h1>
      <div class="right-user">
        <div class="img-wrapper">
          <img :src="img" alt="">
        </div>
        <div class="text-wrapper">
          <span>坐标活动</span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                img: '/static/img/avatar.3df55f3.jpg'
            }
        },
        mounted(){
          this.getUserInfo()
        },
        methods:{
          getUserInfo(){
            this.$http.get('/serviceInfoConfig').then( (res) => {
              let data = res.data.result
              data.picturePath ? this.option.img = data.picturePath : '/static/img/avatar.3df55f3.jpg'
            })
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .headbar {
   height: 60px;
   line-height: 60px;
   background: #3a3f51;
   color: #fff;
   position: relative;
   h1 {
     font-size: 30px;
     text-align: left;
     padding-left: 28px;
     font-weight: 200;
     margin:0;
   }
   .right-user {
     background: #262a3a;
     height: 60px;
     position: absolute;
     right:0;
     top:0;
     padding: 0 20px;
     .img-wrapper {
       float: left;
       height: 60px;
       img {
         height: 40px;
         width: 40px;
         border-radius: 50%;
         margin-top: 10px;
       }
       margin-right: 10px;
     }
     .text-wrapper {
       top: 0;
       height: 60px;
       line-height: 60px;
       float: left;
     }
   }
 }
</style>
