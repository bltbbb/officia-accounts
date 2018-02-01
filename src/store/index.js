import Vue from 'vue'
import Vuex from 'vuex'
import lockr from 'lockr'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      avatar:'',
      name:''
    }
  },
  mutations: {
    //更新用户信息
    updateAvatar(state, payload) {
      state.userInfo.avatar = payload.avatar;
      lockr.set("avatar",payload.avatar);
    },
    updateName(state, payload) {
      state.userInfo.name = payload.name;
      lockr.set("name",payload.name);
    },
  }
})
