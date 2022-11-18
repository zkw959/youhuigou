import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const actions = {
    async categoryList(context){
        let result = await reqCategoryList()
        
        if(result.code === 200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList(context){
        let result = await reqGetBannerList()
        if(result.code === 200){
            context.commit("GETBANNERLIST",result.data)
        }
    },
    // 获取Floor轮播图的数据
    async getFloorList(context){
        let result = await reqFloorList()
        if(result.code === 200){
            
            context.commit("GETFLOORLIST",result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,16)
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}