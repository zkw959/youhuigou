/**
 * 商品交易组件
 */

import { reqOrderInfo, reqUserAddress } from "@/api"


const state = {
    addressList:[],
    orderInfo:[]
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqUserAddress()
        if(result.code === 200){
            // result.data[0].isDefault = '1'
            commit("GETUSERADDRESS",result.data)
        }else{

        }
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code === 200){
            commit("GETORDERINFO",result.data)
        }else{

        }
    }
}
const mutations = {
    GETUSERADDRESS(state,addressList){
        state.addressList = addressList
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
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