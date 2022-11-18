/**
 * 用户登录和注册仓库
 */

import { reqLogin, reqLogout, reqRegister, reqSendCode, reqUserInfo } from "@/api"
import { getToken, removeToken, setToken } from "@/utils/token"
const state = {
  code:'',
  token:getToken(),
  userInfo:{}
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqSendCode(phone)
        if(result.code === 200){
            commit('GETCODE',result.data)
            return true
        }else{
            return new Error('failed')
        }
    },
    // 用户注册
    async register({commit},params){
        let result = await reqRegister(params)
        console.log(result);
        if(result.code === 200){
            return result.message
        }else if(result.code === 223){
            return result.message
        }else if(result.code === 206){
            return result.message
        }else{
            return new Error('failed')
        }
    },
    // 用户登录
    async login({commit},params){
        let result = await reqLogin(params)
        // 服务器下发token，用户唯一标识符
        // 将来通常通过带token找服务器要用户信息进行展示
        if(result.code === 200){
            commit("GETTOKEN",result.data.token)
            return true
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code === 200){
            commit("GETUSERINFO",result.data)
            return true
        }else{
            return Promise.reject("faile")
        }
    },
    // 用户退出登录
    async logout({commit}){
        let result = await reqLogout()
        if(result.code === 200){
            commit("LOGOUT")
            return true
        }else{
            return Promise.reject("faile")
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    GETTOKEN(state,token){
        state.token = token
        setToken(token)
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    LOGOUT(state){
        // 从本地存储中移除token
        removeToken()
        // 清理仓库信息
        state.token = ''
        state.userInfo={}
    }
}
const getters = {
    
  
}
export default {
    state,
    actions,
    mutations,
    getters
}