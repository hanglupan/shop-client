// home模块的小仓库

import {reqCategoryList, reqFloorList, reqGetBannerList} from '@/api';

//state:仓库存储数据的地方
const state={
    //根据返回的数据去初始化
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //Floor轮播图的数据
    floorList:[],
};
//mutations:修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};
// actions:提交mutation,处理异步
const actions={
    //可以提交mutation,但是不可以修改state
    //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){//异步
        let res=await reqCategoryList();
        if(res.code===200){
            commit("CATEGORYLIST",res.data);
        }
    },
    //获取首页轮播图数据
    async getBannerList({commit}){
        let res=await reqGetBannerList();
        if(res.code===200){
            commit('BANNERLIST',res.data);
        }
    },
    //获取Floor数据
    async getFloorList({commit}){
        let res=await reqFloorList();
        if(res.code===200){
            commit('FLOORLIST',res.data);
        }
    }
};
//getters:计算属性，多个组件可以同时获取一个数据
const getters={};

//对外暴露Store类的一个实例
export default{
    // namespaced:true,
    state,
    mutations,
    actions,
    getters
};