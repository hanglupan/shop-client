<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" /><!--src前加入：绑定，动态显示属性-->
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props:['list'],
    watch:{
    list:{
        immediate:true,//千万不要写道handler里面去
        handler(newValue,oldValue){
        // 通过watch来监听bannerList属性变化
        // handler回调函数表明属性已经有了（即填充或者修改）
        // 只能保证bannerList数据已经有了，但是不能保证结构（v-for执行完毕）
        this.$nextTick(()=>{
            var mySwiper=new Swiper(this.$refs.mySwiper,{
            loop:true,// 循环模式选项
            //如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable:true,
            },
            autoplay:true,
            //如果需要前进后退按钮
            navigation:{
              nextEl:'.swiper-button-next',
              prevEl:'.swiper-button-prev',
            }
          });
        })
      }
    }
  }
};
</script>

<style>
</style>