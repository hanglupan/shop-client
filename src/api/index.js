// 当前模块：API统一管理

import requests from './request';//这边就是axios
import mockAjax from './nockAjax';
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
//发请求:axios发送的请求返回的是Pomise对象
// export const reqCategoryList=()=>{
//     return requests({
//         url:'/product/getBaseCategoryList',
//         method:'get',
//     });
// }
//简化

export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList', method:'get'});
//获取轮播图接口banner
export const reqGetBannerList=()=>mockAjax.get('/banner');
// 获取floor数据
export const reqFloorList=()=>mockAjax.get('/floor');