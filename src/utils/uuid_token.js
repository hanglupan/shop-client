import {v4 as uuidv4} from 'uuid';
//生成游客id字符串，不能更改，永久保存
export const getUUID=()=>{
    //从本地存储获取uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){//如果没有
        //生成身份
        uuid_token=uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}