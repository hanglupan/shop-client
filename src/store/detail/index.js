import { reqGoodsInfo,reqAddOrUpdate } from "@/api"
//封装游客身份的模块uuid->生成一个随机的字符串（不能改变）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    uuid_token:getUUID(),
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
}
const actions={
    async getGoodInfo({commit},skuId){
        let res=await reqGoodsInfo(skuId);
        if(res.code===200){
            commit('GETGOODINFO',res.data);
        }
    },
    //将商品添加到购物车||修改一个产品的数量  重点：方法加上async返回的是一个Promise
    async addOrUpdateCart({commit},{skuId,skuNum}){//解构
        //加入购物车（发请求），前台将参数带给服务器
        //服务器写入数据成功，只是返回code==200，并没有返回data
        let res=await reqAddOrUpdate(skuId,skuNum);
        if(res.code===200){//成功
            return 'ok';
        }else{//加入购物车失败
            return Promise.reject(new Error('failed'));
        }
    }
}
const getters={
    // 路径导航简化
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    // 产品信息简化
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    // 产品售卖信息简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    },
}
export default{
    state,
    mutations,
    actions,
    getters
}
