// src下创建mock文件夹，
// 创建相应的JSON数据——格式化一下
// mock中的数据放在public文件夹中（webpack打包会打包到dist文件夹
// 创建mockServe.js文件，通过mock插件模拟数据
// mockServe.js在入口文件引入（至少需要执行一次）


// 引入mock模块
import Mock from 'mockjs';
// 引入json数据[JSON数据没有对外暴露，但是可以引入]
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

//参数:请求地址，请求数据
Mock.mock('/mock/banner',{
    code:200,
    data:banner
});

Mock.mock('/mock/floor',{
    code:200,
    data:floor
});