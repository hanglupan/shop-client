// search模块的小仓库

import { reqGetSearchInfo } from "@/api";


//state:仓库存储数据的地方
const state={
    searchList:{}
};
//mutations:修改state的唯一手段
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
};
// actions:提交mutation,处理异步
const actions={
    //可以提交mutation,但是不可以修改state
    async getSearchList({commit},params={}){//第二个形参至少是一个空对象
        let res=await reqGetSearchInfo(params);
        if(res.code===200){
            commit('GETSEARCHLIST',res.data);
        }
    }
};
//getters:计算属性，多个组件可以同时获取一个数据 简化作用
const getters={
    goodsList(state){//形参为当前仓库中的state，并非大仓库中的state
        return state.searchList.goodsList||[];//没有的话返回空数组
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }

};

//对外暴露Store类的一个实例
export default{
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
};