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
//获取search数据
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data:params});//测试，传参至少传个{}空对象
//获取detail数据
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});
//添加或者更新购物车
export const reqAddOrUpdate=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});
//获取购物车列表
export const reqCartList=()=>requests({url:`/cart/cartList`,method:'get'});
//删除购物车产品
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//切换商品选中状态
export const reqUpdateCheckCartById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//注册
export const reqRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'});
//登录
export const reqLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'});
//获取用户信息
export const reqUserInfo=()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});
//退出登录
export const reqLogout=()=>requests({url:`/user/passport/logout`,method:'get'});
//获取用户地址信息
export const reqAddressInfo=()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});
//获取用户交易信息
export const reqOrderInfo=()=>requests({url:`/order/auth/trade`,method:'get'});
//提交订单的接口
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取支付信息
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取订单支付状态
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});