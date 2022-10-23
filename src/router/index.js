//配置路由
import Vue from 'vue'//这边是大写的Vue
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

//重写路由的push和replace，在编程式导航时多次点击抛出异常警告（但是现在版本提升之后就不会在console里面显示警告了）
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;

VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve||reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve||reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

//配置路由
export default new VueRouter({
    routes: [
        { path: '/home', component: Home, meta: { show: true } },
        { path: '/search/:keyword?', component: Search, meta: { show: true }, name: "search", props:true},
        { path: '/login', component: Login, meta: { show: false } },
        { path: '/register', component: Register, meta: { show: false } },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        { path: '*', redirect: '/home' },
    ]
});