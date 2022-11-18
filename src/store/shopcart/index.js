import { reqCartList, reqDeleteCartById, reqUpdateCheckCartById } from "@/api"


const state = {
    cartList:{}
}
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code === 200){
            commit("GETCARTLIST",result.data[0])
        }
    },
    async deleteCartById({commit},skuId){
        const result = await reqDeleteCartById(skuId)
        if(result.code === 200){
            return true
        }else{
            return Promise.reject("failed")
        }
    },
    async updateCheckCartById({commit},{skuId,isChecked}){
        const result = await reqUpdateCheckCartById(skuId,isChecked)
        if(result.code === 200){
            return true
        }else{
            return Promise.reject("failed")
        }
    },
    async deleteCartAll({dispatch,getters}){
        let promiseAll = [] 
        getters.cartInfoList.forEach(item => {
            if(item.isChecked){
                promiseAll.push(dispatch("deleteCartById",item.skuId))
            }
        });
        console.log(promiseAll);
        return Promise.all(promiseAll)
    },
    async updateCheckCartAll({dispatch,getters},isChecked){

        let promiseAll = [] 
        getters.cartInfoList.forEach(item => {
            if(item.isChecked != isChecked){
                promiseAll.push(dispatch("updateCheckCartById",{
                    skuId:item.skuId,
                    isChecked
                }))
            }
        });
        return Promise.all(promiseAll)
    },


    
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const getters = {
    cartInfoList(state){
        if(!state.cartList){
            return []
        }
        return state.cartList.cartInfoList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}