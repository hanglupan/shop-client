<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slideImage,index) in skuImageList"
        :key="slideImage.id"
      >
        <img :src="slideImage.imgUrl" :class="{active:currentIndex===index}" @click="changeActive(index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods:{
    changeActive(index){
      //点击轮播图图片切换active
      this.currentIndex=index;
      //通知兄弟组件（放大镜）换图
      this.$bus.$emit('getIndex',this.currentIndex);
    },
    
    
  },
  watch: {
    //可以保证数据一定Ok,但是不能保证v-for遍历结构是否完整
    skuImageList(oldValue, newValue) {
      //将回调延迟到下次DOM更新循环之后执行
      this.$nextTick(() => {
        //轮播器
        new Swiper(this.$refs.cur, {
          //如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //显示几个图片
          slidesPerView: 3,
          //每次切换图片个数
          slidesPerGroup: 1,
        });
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>