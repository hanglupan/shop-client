<!--Home这个大的组件-->
<template>
    <div><!--必须加上div 因为template必须有一个根组件-->
        <!-- 三级联动全局组件：三级联动已经成为了全局组件，因此不需要再引入 -->
        <TypeNav/>
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <!-- Floor这个组件，在自己内部不发请求，数据是父组件给的 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list='floor'/>
        <Brand />
    </div>
</template>

<script>
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';

import {mapState} from 'vuex';

export default {
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted(){
        //派发action,获取floor组件的数据
        this.$store.dispatch('getFloorList')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
    
};
</script>

<style>
</style>