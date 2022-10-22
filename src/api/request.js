// 对axios进行二次封装 需要请求和响应拦截器
import axios from "axios";
//创建axios实例
const requests=axios.create({
    baseURL:'/api',//基础路径
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    //请求头headers属性（重要）
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data;
},()=>{
    return Promise.reject(new Error('failed'))
});

//对外暴露
export default requests;

