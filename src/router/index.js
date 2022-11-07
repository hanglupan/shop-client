//配置路由
import Vue from 'vue'//这边是大写的Vue
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store'
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
let router=new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savePostion) {
        //代表滚动条在顶部
        return { y: 0 }
    },
});
//全局前置守卫 保证登录后不能跳转到login里面
router.beforeEach(async (to,from,next)=>{
    //next放行函数
    //为了测试全部放行
    // next();
    //有token确定用户登录了
    let token=store.state.user.token;
    let name=store.state.user.userInfo.name;
    //用户登录了
    if(token){
        //前往login或者register
        if(to.path==='/login'||to.path==='/register'){
            next('/home')
        }else{
            if(name){
                //有用户名，放行
                next();
            }else{
                try{
                    //获取用户信息
                    await store.dispatch('getUserInfo')
                }catch(err){
                    //token失效
                    //清除token之类的数据
                    //回到login
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    }else{
        //未登录 不能去支付、交易、用户中心
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把想去但是没有去的路由加入到信息中  使得登陆后直接跳转到该路由而非home页
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})


// 只有交易页面才能跳转到支付页面
// 只有支付页面才能跳转到支付成功页面


export default router;