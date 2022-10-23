import Vue from 'vue';
import Vuex from 'vuex';

// 将 Vuex作为插件安装
//因为Vuex依赖于Vue，所以需要使用use，但是nprogress不依赖，所以不用use
Vue.use(Vuex);//Vuex作为一个对象

//引入小仓库
import home from './home';
import search from './search';
//对外暴露Store类的一个实例
export default new Vuex.Store({
    modules:{
        home,
        search,
    }
});

