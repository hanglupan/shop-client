//配置路由
import Vue from 'vue'//这边是大写的Vue
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter);

//重写路由的push和replace，在编程式导航时多次点击抛出异常警告（但是现在版本提升之后就不会在console里面显示警告了）
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve || reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve || reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
export default new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savePostion) {
        //代表滚动条在顶部
        return { y: 0 }
    },
});