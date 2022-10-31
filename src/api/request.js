// 对axios进行二次封装 需要请求和响应拦截器
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';//nprogress是一个对象，里面有start:进度条开始，done:进度条结束
//引入进度条的样式
import 'nprogress/nprogress.css'
//在当前模块中引入store
import store from '@/store'
//创建axios实例
const requests=axios.create({
    baseURL:'/api',//基础路径
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    //请求头headers属性（重要）
    if(store.state.detail.uuid_token){//捞到仓库中的uuid
        //请求头添加一个字段 userTempId固定死了
        config.headers.userTempId=store.state.detail.uuid_token;
    }
    //进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    //响应成功
    return res.data;
},()=>{
    //响应失败
    return Promise.reject(new Error('failed'))
});

//对外暴露
export default requests;

