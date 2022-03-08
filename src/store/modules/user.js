import { loginApi } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { setCookie, getUserCookie, removeCookie } from '@/utils/userCookie'

const getDefaultState = () => {
  return {
    // token: getToken(),
    name: '',
    avatar: '',
    users: getUserCookie(), //用户信息
    menuRoutes: [], //菜单的路由信息
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  SET_USER: (state, payload)=>{
    state.users = payload;
  },
  SET_ROUTES: (state, payload)=>{
    state.menuRoutes = payload;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(response => {
        const { data } = response
        if(data){
          commit('SET_USER', data)
          setCookie(data)
          resolve()
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  },

  // user logout
  logout({ commit }) {
    commit('SET_USER', {
      username: '',
      appkey: '',
      role: "",
      email: '',
    });
    removeCookie();
  },

  // remove token
  // resetToken({ commit }) {
  //   // return new Promise(resolve => {
  //   //   removeToken() // must remove  token  first
  //   //   commit('RESET_STATE')
  //   //   resolve()
  //   // })
  // }

  changeMenuRoutes({commit}, routes){
    commit('SET_ROUTES', routes);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

