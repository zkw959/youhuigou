/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入center的二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder' */

// const foo = () => import('@/pages/Home')
/* 
    当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
    如果我们能把不同路由对应的组件分割成不同的代码块，
    然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
// 路由配置信息
export default [
    
    {
        name:'center',
        path:'/center',
        component: ()=>import('@/pages/Center'),
        meta:{isShow:true},
        children:[
            {
                name:'myorder',
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                name:'grouporder',
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }

        ]
    },
    {
        name:'paySuccess',
        path:'/paySuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta:{isShow:true}
    },
    {
        name:'pay',
        path:'/pay',
        component: ()=>import('@/pages/Pay'),
        meta:{isShow:true},
        beforeEnter: (to, from, next) => {
            // 如果路由是从trade并且有orderId由来的就放行
            console.log(to,from);
            if(from.path == '/trade' && to.query.orderId){
                next()
            }else{      
                next(false)

            }
        }
    },
    {
        name:'trade',
        path:'/trade',
        component: ()=>import('@/pages/Trade'),
        meta:{isShow:true},
        beforeEnter: (to, from, next) => {
            // 如果路由是从shopcar路由来的就放行
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta:{isShow:true},
        
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta:{isShow:true}
    },
    {
        name:'detail',
        path:'/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta:{isShow:true}
    },
   
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{isShow:true}
    },

    {
        name:'search',
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        meta:{isShow:true},
        // 1.布尔值
        // props:true
        // 2.函数
        // props($route){
        //     return{keyWord:$route.params.keyWord,categoryName:$route.query.categoryName}
        // }
    },                                                                                              
    {
        path:'/login',
        component:()=>import('@/pages/Login')
        
    },
    
    {
        path:'/register',
        component:()=>import('@/pages/Register')
    },

    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'/',
        redirect:'/home'
        
    }

]