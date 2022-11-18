import { reqAddOrUpdateShopCart, reqGetGoodDetail } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
const actions = {
    // 获取商品信息
    async getGoodInfo({commit},skuId){
        const result = await reqGetGoodDetail(skuId)
        if(result.code === 200){
            commit("GETGOODINFO",result.data)
        }
    },
    // 添加并更新购物车
    async adOrUpdateShopCart({commit},{skuId, skuNum}){
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code === 200){
            return true;
        }else{
            return Promise.reject("failed")
        }
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 简化售卖属性的数据
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList || []
    },
  
}
export default {
    state,
    actions,
    mutations,
    getters
}