import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'
// 引入store
import store from '@/store'

// 重写VueRouter原型上push和replace方法
// 1.获取原始方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 2.通过call调用originPush、originReplace方法
VueRouter.prototype.push = function(localtion,resolve,reject){
    if(resolve && reject){
        originPush.call(this,localtion,resolve,reject)
    }else{
        originPush.call(this,localtion,()=>{},()=>{})
    }
    
}
VueRouter.prototype.replace = function(localtion,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,localtion,resolve,reject)
    }else{
        originReplace.call(this,localtion,()=>{},()=>{})
    }
    
}
let router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
    }
})

// 全局守卫，前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // to：可以获取到你要跳转到那个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行函数
    let token = store.state.user.token
    let name = store.state.user.userInfo.loginName
    // 用户已经登录了
    if(token){
        // 用户想去login路由
        if(to.path === '/login'){
            alert("请退出登录再操作！")
            next(false)
        }else{
            // 用户去非logi路由
           
            if(name){
                // 如果用户名已有
                next()
            }else{
                // 如果用户名不存在,派发action让仓库存储用户信息在跳转
                try {
                    // 用户信息获取成功
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    // 用户信息获取失败，常见于用户token失效
                    // 清除token，并且进行退出登录
                    alert(error.message)
                    store.dispatch("logout")
                    next('/login')
                }
                  
            }
        }
    }else{
        // 未登录：不能去交易、支付、个人中心相关的路由
        const routerArr = ["/trade","/pay","/paySuccess","/center"]
        // 检测路径是否包含上面的字符串
        const toPath = to.path
        let res = routerArr.some(item=>toPath.indexOf(item)>-1)
        if(res){
            // 如果包含
            alert("请登录后重试！")
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
        
    }
    
})
export default router