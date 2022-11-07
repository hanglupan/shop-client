// search模块的小仓库

import { reqAddressInfo, reqOrderInfo } from "@/api";


//state:仓库存储数据的地方
const state={
    address:[],
    order:{},
};
//mutations:修改state的唯一手段
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address;
    },
    GETORDERINFO(state,order){
        state.order=order;
    }
};
// actions:提交mutation,处理异步
const actions={
    //可以提交mutation,但是不可以修改state
    //获取地址
    async getUserAddress({commit}){
        let res=await reqAddressInfo();
        console.log(res);
        if(res.code===200){
            commit('GETUSERADDRESS',res.data);
        }
    },
    //获取交易清单
    async getOrderInfo({commit}){
        let res=await reqOrderInfo();
        console.log(res);
        if(res.code===200){
            commit('GETORDERINFO',res.data);
        }
    },
};
//getters:计算属性，多个组件可以同时获取一个数据 简化作用
const getters={
    

};

//对外暴露Store类的一个实例
export default{
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
};