import { reqGoodsInfo } from "@/api"

const state={
    goodInfo:{},
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
