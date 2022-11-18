// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入仓库
import store from '@/store'
const requests = axios.create({
    baseURL:"http://gmall-h5-api.atguigu.cn/api",
    timeout: 5000
})

// 设置请求拦截器
requests.interceptors.request.use(config=>{
    // 设置uuid请求头
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段(userTempId)
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    nprogress.start()
    
    return config
})
// 设置响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},error=>{
    return Promise.reject(new Error(error))
})

// 对外暴露
export  default requests