<template>
    <div class="edite-menu">
      <div class="tip">
        <h4>菜单编辑中</h4>
        <p>菜单未发布，请确认菜单编辑完成后点击“保存并发布”同步到手机。</p>
      </div>
      <div class="menu_preview_area">
        <div class="mobile_menu_preview">
          <div class="mobile_bd">
            <ul class="pre_menu_list">
              <li v-for="(item,index) in form" :class="{active:(activeIndex == index) && activeMenuBoolean}" @click="activeMenu(index)">
                <span v-if="item.menuName != ''">{{item.menuName}}</span>
                <span v-if="item.menuName == ''">菜单名称</span>
                <ul class="pre_menu_list_child" v-show="activeIndex == index" v-if="form.length != 0">
                  <li v-for="(list,index1) in item['sub_menu']" :class="{noTopBorder:index1 == 0,active:(activeChildIndex == index1) && activeChilMenuBoolean}" @click.stop="activeChilMenu(index1);">
                    <span v-if="list.menuName != ''">{{list.menuName}}</span>
                    <span v-if="list.menuName == ''">子菜单名称</span>
                  </li>
                  <li class="addChildMenu" :class="{noTopBorder:item['sub_menu'].length == 0}" @click.stop="addChildMenu(index)" v-if="item['sub_menu'].length <= 4">
                    <span><i class="el-icon-plus"></i></span>
                  </li>
                </ul>
              </li>
              <li class="addMenu" @click="addMenu" v-if="form.length <= 2">
                <span><i class="el-icon-plus"></i></span>
                <span v-if="form.length == 0">添加菜单</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="menu_form_area">
        <div class="js_rightBox">
          <div class="editor_inner">
            <div class="editor_header">
              <span style="float: left;">{{menuForm.name ? menuForm.name : menuTopName}}</span>
              <span style="float: right;color: #337ab7;cursor: pointer;" @click="deleteMenu">删除菜单</span>
            </div>
            <div class="editor_body">
              <el-form ref="form" :model="menuForm" label-width="80px" label-position="left">
                <el-form-item label="菜单名称">
                  <el-input style="width: 300px" v-model="menuForm.name" placeholder="请输入菜单名称" @blur="saveMenuName"></el-input>
                  <br>
                  <span style="color: #8d8d8d;">字数不超过4个汉字或8个字母</span>
                </el-form-item>
                <el-form-item label="菜单内容" v-if="!isCatalog">
                  <el-radio-group v-model="menuForm.type" size="medium">
                    <el-radio border label="跳转网页"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="url-wrapper" v-if="!isCatalog">
                  <span style="color: #8d8d8d;">阅读者点击该子菜单会跳到以下链接</span>
                  <el-form-item label="页面地址">
                    <el-input style="width: 300px" v-model="menuForm.url" placeholder="请输入跳转链接地址" @blur="saveUrlPath"></el-input>
                    <br>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return {
            form:[],
            menuForm:{
              name:'',
              type: '跳转网页',
              url:''
            },
            activeIndex:0,
            activeChildIndex:0,
            activeChilMenuBoolean:false,
            activeMenuBoolean:true,
            isCatalog: true,
            menuTopName: ''
          }
      },
      mounted(){
        this.init()
      },
      methods:{
        init(){
            this.getMenu()
        },
        getMenu(){
          this.$http.get('/serviceInfoMenus').then( (res) => {
            this.form = res.data.result
            this.menuForm.name = this.form[0].menuName
          })
        },
        addMenu(){
          let data = {
            menuName :"",
            menuType  :2,
            urlPath  : '',
            target :2,
            'sub_menu':[]
          }

          this.form.push(data)

          this.pushFrom()

        },
        addChildMenu(index){
          let data = {
            menuName : '',
            urlPath  : '',
            menuType  :1,
            target :2,
          }

          this.form[index]['sub_menu'].unshift(data)

          this.pushFrom()
        },
        saveMenuName(){
          if(this.getByteLen(this.menuForm.name) > 8){
            this.$message.error('请按规则填写菜单名')
            return
          }
          if(this.activeMenuBoolean){
            this.form[this.activeIndex].menuName = this.menuForm.name
          }
          if(this.activeChilMenuBoolean){
            this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].menuName = this.menuForm.name
          }
          this.pushFrom()
        },
        saveUrlPath(){
          if(this.activeMenuBoolean){
            this.form[this.activeIndex].urlPath = this.menuForm.urlPath
          }
          if(this.activeChilMenuBoolean){
            this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].urlPath = this.menuForm.urlPath
          }
          this.pushFrom()
        },
        activeMenu(index){
          this.menuTopName = '菜单名称'
          this.activeChilMenuBoolean = false
          this.activeMenuBoolean = true
          this.activeIndex = index
          this.menuForm.name = this.form[this.activeIndex].menuName
          this.menuForm.urlPath = this.form[this.activeIndex].urlPath
          if(this.form[this.activeIndex]['sub_menu'].length > 0){
              this.isCatalog = true
          }
        },
        activeChilMenu(index){
          this.menuTopName = '子菜单名称'
          this.isCatalog = false
          this.activeChilMenuBoolean = true
          this.activeMenuBoolean = false
          this.activeChildIndex = index
          this.menuForm.name = this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].menuName
          this.menuForm.urlPath = this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].urlPath
        },
        deleteMenu(){
          if(this.activeMenuBoolean){
            this.form.splice(this.activeIndex,1)
          }
          if(this.activeChilMenuBoolean){
            this.form[this.activeIndex]['sub_menu'].splice(this.activeChildIndex,1)
          }
          this.pushFrom()
          this.menuForm.name = this.form[this.activeIndex].menuName
          this.menuForm.urlPath = this.form[this.activeIndex].urlPath
          this.menuForm.name = this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].menuName
          this.menuForm.urlPath = this.form[this.activeIndex]['sub_menu'][this.activeChildIndex].urlPath
        },
        pushFrom(){
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'shouldQs':false
            }
          };
          this.$http.put('/serviceInfoMenus',this.form,config).then( (res) => {})
        },
        //字符长度
        getByteLen(val) {
          var len = 0;
          for (let i = 0; i < val.length; i++) {
            var length = val.charCodeAt(i);
            if(length>=0&&length<=128)
            {
              len += 1;
            }
            else
            {
              len += 2;
            }
          }
          return len;
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .edite-menu {
    padding: 0 20px 40px;
    overflow: hidden;
    .tip {
      padding: 8px 16px;
      background-color: #ecf8ff;
      border-radius: 4px;
      border-left: 5px solid #50bfff;
      margin: 20px 0;
      h4 {
        font-size: 14px;
      }
      p {
        font-size: 12px;
      }
    }
    .menu_preview_area {
      float: left;
      margin-right: 12px;
      position: relative;
      .mobile_menu_preview {
        width: 320px;
        height: 580px;
        -webkit-background-size: contain;
        background-size: contain;
        position: relative;
        background: transparent url('../../assets/img/bg_mobile_head.png') no-repeat 0 0;
        background-position: 0 0;
        border: 1px solid #e7e7eb;
        .mobile_bd {
          .pre_menu_list{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #e7e7eb;
            background: transparent url('../../assets/img/bg_mobile_foot.png') no-repeat 0 0;
            background-position: 0 0;
            background-repeat: no-repeat;
            padding-left: 43px;
            height: 50px;
            display: flex;
            &>li {
              flex:1;
              line-height: 50px;
              text-align: center;
              font-size:12px;
              border-left: 1px solid #e7e7eb;
              position: relative;
              &.active {
                border: 1px solid #44b549;
                color: #44b549;
              }
              .pre_menu_list_child {
                border: 1px solid #d0d0d0;
                width: 100%;
                position: absolute;
                left:0;
                bottom: 60px;
                li {
                  display: inline-block;
                  width: 100%;
                  color: #616161;
                  border-top: 1px solid #d0d0d0;
                  &.noTopBorder {
                    border-top: none;
                  }
                  &.active {
                    border: 1px solid #44b549;
                    color: #44b549;
                  }
                }
              }
            }
          }
        }
      }
    }
    .menu_form_area {
      padding: 10px 30px;
      display: table-cell;
      vertical-align: top;
      float: right;
      width: 65%;
      min-height:580px;
      background: #F4F5F9;
      .js_rightBox {
        padding-left: 12px;
        position: relative;
        .editor_header{
          overflow: hidden;
          font-size: 14px;
          padding-bottom: 10px;
          border-bottom:1px solid #e7e7eb;
        }
        .editor_body {
          padding-top: 20px;
          .url-wrapper {
            padding: 20px;
            background: #fff;
            border:1px solid #e7e7eb;
            span {
              display: inline-block;
              padding-bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>
