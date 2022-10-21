<!--Home这个大的组件-->
<template>
    <div><!--必须加上div 因为template必须有一个根组件-->
        <!-- 三级联动全局组件：三级联动已经成为了全局组件，因此不需要再引入 -->
        <TypeNav/>
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor />
        <Floor />
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
export default {
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    }
};
</script>

<style>
</style>