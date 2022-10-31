
import {reqCartList,reqDeleteCartById,reqUpdateCheckCartById} from '@/api';
const state={
    shopCartList:[],
}
const mutations={
    GETSHOPCART(state,shopCartList){
        state.shopCartList=shopCartList;
    }
}
const actions={
    //获取购物车列表
    async getCartList({commit}){
        let res=await reqCartList();
        if(res.code===200){
            commit('GETSHOPCART',res.data);
        }
    },
    //删除购物车某一个产品
    async deleteCartListById({commit},skuId){
        let res=await reqDeleteCartById(skuId);
        if(res.code===200){
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //修改购物车某一个产品选中状态
    async updateCheckCartById({commit},{skuId,isChecked}){
        let res=await reqUpdateCheckCartById(skuId,isChecked);
        if(res.code===200){
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //删除购物车所有产品
    deleteAllCheckedCart({dispatch,getters}){//context是store实例具有相同方法和属性的对象
        let PromiseAll=[];//数组
        //context :小仓库，commit【提交mutation修改state】getters【计算属性】dispatch【派发action】state【当前仓库数据】
        getters.cartList.cartInfoList.forEach(item=>{//遍历所有的cart然后调用上面的删除一条数据
            let promise=item.isChecked===1?dispatch('deleteCartListById',item.skuId):"";
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);//判断数组里面的每一个promise是否都能成功返回
    },
    //选中全部的商品（全选）
    updateAllCartChecked({dispatch,getters},isChecked){
        let PromiseAll=[];//数组
        getters.cartList.cartInfoList.forEach(item=>{
            let promise=dispatch('updateCheckCartById',{
                skuId:item.skuId,
                isChecked:isChecked
            });
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }
}
const getters={
    cartList(state){
        return state.shopCartList[0]||{};
    },
    // cartInfoList(state){
    //     return state.cartList.cartInfoList||[];
    // }
}
export default{
    state,
    mutations,
    actions,
    getters
}
