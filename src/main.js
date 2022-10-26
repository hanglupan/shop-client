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

// //测试
// import {reqCategoryList} from '@/api';
// reqCategoryList();
new Vue({
  render: h => h(App),
  //注册路由,kv省略掉v
  //注册路由信息：router同时拥有$route,$router属性
  router,
  //注册仓库：组件多了一个$store属性
  store
}).$mount('#app')
