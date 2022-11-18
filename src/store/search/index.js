import {reqGetSearchInfo} from '@/api'
const state = {
    searchList:{}
}
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        const result = await reqGetSearchInfo(params)
        if(result.code === 200){
            commit("GETSEARCHLIST",result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const getters = {
    goodsList:(state)=>state.searchList.goodsList || [],
    attrsList:(state)=>state.searchList.attrsList || [],
    trademarkList:(state)=>state.searchList.trademarkList || [],
    total:(state)=>state.searchList.total
}
export default {
    state,
    actions,
    mutations,
    getters
}