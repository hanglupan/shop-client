import { reqGetCode,reqLogin,reqRegister, reqUserInfo } from "@/api"

const state={
    code:'',
    token:'',
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
            commit('USERLOGIN',res.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let res=await reqUserInfo();
        console.log(res);
        if(res.code===200){
            commit('GETUSERINFO',res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('failed'));
        }
    }
}
const getters={

}
export default{
    state,
    mutations,
    actions,
    getters
}