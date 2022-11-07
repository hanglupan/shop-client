import Vue from 'vue'
import App from './App.vue'

// Vue.config.productionTip = false
//引入路由
import router from '@/router'
//三级联动组件——全局组件
import TypeNav from '@/components/TypeNav';
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
//引入仓库
import store from '@/store';
//引入MockServe.js ---mock数据
import '@/mock/mockServe';
//引swiper样式
import 'swiper/css/swiper.css';
//引入轮播图
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name,Carousel);
//引入分页器
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination);
// //测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();
//在element-ui引入
import { Button,MessageBox} from 'element-ui';
//一种方式：挂载在原型链上
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
//另一种方法：全局组件
Vue.component(Button.name,Button);
//统一接口api文件夹里面全部请求函数

// import * as API from '@/api'
// //引入图片懒加载插件
// import VueLazyload from 'vue-lazyload';
// // 注册插件
// Vue.use(VueLazyload,{
//   loading://懒加载默认图片
// })

import veevalidate from '@/plugins/veevalidate';
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  //注册路由,kv省略掉v
  //注册路由信息：router同时拥有$route,$router属性
  router,
  //注册仓库：组件多了一个$store属性
  store
}).$mount('#app')
