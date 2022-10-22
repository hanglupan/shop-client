const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint
  //代理跨域
  devServer:{
    proxy:{
      '/api':{//出现api
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},//路径重写 由于所有的路径都带api所以就不用重写了
      }
    }
  }
})
