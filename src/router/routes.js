// 路由配置信息

//引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// //引入二级路由组件
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

//全部路由懒加载
export default [
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'), 
        meta: { show: true },
        name: "search", props: true
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component:()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: { show: false }
    },
    //name命名路由，这边必须加，但是原因未知？？查到是因为路由比较多且复杂
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: false }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: false },
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: false },
        // 组件独享守卫：
        // 只有购物车页面才能跳转到交易页面
        beforeEnter:(to,from,next)=>{
            if(from.path=='/shopcart'){//从购物车来
                next();
            }else{
                //其他页面进入，（但是有Bug,比如进入的时候数据没有传过去
                next(false);
            }
        }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: false },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){//从购物车来
                next();
            }else{
                //其他页面进入，（但是有Bug,比如进入的时候数据没有传过去
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: false },

    },
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: { show: false },
        //二级路由
        children: [
            {
                path: 'myOrder',
                component: MyOrder,
            },
            {
                path: 'groupOrder',
                component: GroupOrder,
            },
            {
                //只要访问center，就重定向到/center/myOrder
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    },
]