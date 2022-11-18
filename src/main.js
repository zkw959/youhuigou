import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import { Button, MessageBox } from 'element-ui';

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button);


Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 引入仓库
import store from '@/store'

Vue.config.productionTip = false
// 引入mock数据
import "@/mock/mockServe"
//  引入swiper样式
import 'swiper/css/swiper.css'
// 引入公共API
import * as API from '@/api'

// 引入插件
import VueLazyload from 'vue-lazyload'

// 注册插件
const loadimage = require('./assets/load.gif')
import myplugins from '@/plugins/myplugins'
Vue.use(myplugins,{
  name:"upper"
})
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
})
new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
