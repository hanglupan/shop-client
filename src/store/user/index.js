import { reqGetCode,reqLogin,reqLogout,reqRegister, reqUserInfo } from "@/api"
import {setToken,getToken, removeToken} from '@/utils/token'
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    CLEAR(state){
        state.userInfo={};
        state.token='';
        removeToken();
    }
}
const actions={
    //获取验证码
    async getCode({commit},phone){
        let res=await reqGetCode(phone);
        if(res.code===200){
            commit('GETCODE',res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //用户注册
    async userRegister({commit},user){
        let res=await reqRegister(user);
        if(res.code===200){
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //用户登录
    async userLogin({commit},user){
        let res=await reqLogin(user);
        if(res.code===200){
            //登录成功获取到Token
            commit('USERLOGIN',res.data.token);
            //持久化存储
            setToken(res.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let res=await reqUserInfo();
        if(res.code===200){
            commit('GETUSERINFO',res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户退出
    async userLogout({commit}){
        let res=await reqLogout();
        if(res.code===200){
            // action里面不能操作state
            commit('CLEAR');
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
}
const getters={

}
export default{
    state,
    mutations,
    actions,
    getters
}