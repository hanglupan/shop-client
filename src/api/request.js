// 对axios进行二次封装 需要请求和响应拦截器
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';//nprogress是一个对象，里面有start:进度条开始，done:进度条结束
//引入进度条的样式
import 'nprogress/nprogress.css'
//创建axios实例
const requests=axios.create({
    baseURL:'/api',//基础路径
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    //请求头headers属性（重要）
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

