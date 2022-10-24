<!--三级联动组件-->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <!--事件委派，把子元素的事件leaveIndex委派给父元素-->
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort"><!--添加过渡动画-->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <!--添加属性cur当currentIndex===index-->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true, //默认显示
    };
  },
  // 组件挂载完毕：可以向服务器发请求
  mounted() {
    //当组件挂载完毕，让show的属性变为false
    //路由组件的路径不是home就将typeNav隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //对象形式
      //右侧是一个函数，使用计算属性，右侧会立即执行一次
      //注入参数state,state为大仓库中的数据
      categoryList: (state) => state.home.categoryList, //应该是获取数据值
    }),
  },
  methods: {
    //鼠标进入，currentIndex修改成index，并且添加class类别  ES6写法  目的：修改背景颜色
    // changeIndex(index){
    //   this.currentIndex=index;
    // },
    //ES5写法 别用箭头函数对，this不管用 throttle节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 10),
    //鼠标点击三级联动跳转+传参
    goSearch(event) {
      //事件委派+编程式导航
      //1.判断是否点击的a标签，并且点击怎么确定是1、2、3级分类中的哪一个
      let element = event.target;
      console.log(element);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果身上有categoryname一定是a标签
      if (categoryname) {
        //a标签
        //2.获取参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //1,2,3级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //判断路由跳转时是否携带params参数
        if(this.$route.params){
          //整理参数
          location.params=this.$route.params;
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    //鼠标移入全部商品分类，显示三级标签
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
    //鼠标移出全部商品分类，隐藏三级标签
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px; //多出来一条数据，修改行高
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  //&表示less嵌套的占位符
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // .item:hover{//三级联动添加背景颜色
        //   background-color: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter, .sort-leave-to{
      height: 0px;
      opacity: 0;
    }
    //过渡动画结束状态（进入）
    // .sort-enter-to{
    //   height:461px;
    // }
    //定义动画时间
    .sort-enter-active{
      transition: opacity .5s;
    }
  }
}
</style>