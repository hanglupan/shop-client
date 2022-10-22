// 当前模块：API统一管理

import requests from './request';//这边就是axios

// 三级联动接口

//发请求:axios发送的请求返回的是Pomise对象
// export const reqCategoryList=()=>{
//     return requests({
//         url:'/product/getBaseCategoryList',
//         method:'get',
//     });
// }
//简化
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList', method:'get'});