// 路由配置信息

//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/search/:keyword?', component: Search, meta: { show: true }, name: "search", props: true },
    { path: '/login', component: Login, meta: { show: false } },
    { path: '/register', component: Register, meta: { show: false } },
    { path: '/detail/:skuid', component: Detail, meta: { show: false } },
    //name命名路由，这边必须加，但是原因未知？？查到是因为路由比较多且复杂
    { path: '/addcartsuccess',name:'addcartsuccess',component: AddCartSuccess, meta: { show: false } },
    { path: '/shopcart', component: ShopCart, meta: { show: false } },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    { path: '*', redirect: '/home' },
]