<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked===1" @change="updateChecked(cart,$event)"><!--单向绑定，所以需要传入event-->
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a><!--第一个参数是type类型，由于三个按钮都是触发同一个函数,第二个参数是变化的数量-->
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"  @change="handler('change',$event.target.value*1,cart)"><!--乘以数量变成数量-->
            <a href="javascript:void(0)" class="plus"  @click="handler('add',-1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked'  @change="updateAllCartChecked" :disabled='cartInfoList.length===0'>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { throttle } from "lodash";
  export default {
    name: 'ShopCart',
    methods:{
      //获取数据
      getData(){
        this.$store.dispatch('getCartList');
      },
      //修改购物车产品数量
      handler:throttle(async function(type,disNum,cart){//需要节流，防止减号点击过快而数量变成负数  
        //感觉disNum不用传递过来，直接在函数里面定义即可
        //type：区分三个元素
        //disNum：+变化量（1），-变化量（-1），input不是变化量（最后的个数）
        //cart：哪一个产品
        switch(type){
          case 'minus'://这边有bug,当按钮点击过快会出现小于0的情况
            disNum=cart.skuNum>1?-1:0;//产品个数小于等于1，则不再减小 
            break;
          case 'change':
            disNum=(isNaN(disNum)||disNum<1)?0:parseInt(disNum)-cart.skuNum;
            break;
          case 'add':
            disNum=1;
            break;
        }
        try{
          //代表的是修改成功
          await this.$store.dispatch('addOrUpdateCart',{
          skuId:cart.skuId,
          skuNum:disNum,
        });
        this.getData();//展示数据
        }catch(err){
          console.log(new Error('failed'));
        }
      },1000),
      //删除购物车通过id
      async deleteCartById(cart){
        try{
          await this.$store.dispatch('deleteCartListById',cart.skuId);
          this.getData();
        }catch(err){
          alert(err.message);
        }
      },
      //修改某个产品的checked
      async updateChecked(cart,event){
        try{
          let checked=event.target.checked?'1':'0';
          await this.$store.dispatch('updateCheckCartById',{
            skuId:cart.skuId,
            isChecked:checked
          });
          this.getData(); 
        }catch(err){
          alert(err.message);
        }
      },
      //删除全部选中的商品
      async deleteAllCheckedCart(){
        try{
          await this.$store.dispatch('deleteAllCheckedCart');
          this.getData(); 
        }catch(err){
          alert(err.message);
        }
      },
      //修改产品的选中
      async updateAllCartChecked(event){
        try{
          let isChecked=event.target.checked?'1':'0';
          //派发action
          await this.$store.dispatch('updateAllCartChecked',isChecked);
          this.getData();
        }catch(err){
           alert(err.message);
        }
      }
    },
    mounted(){
      this.getData();
    },
    computed:{
      ...mapGetters(['cartList']),
      cartInfoList(){
        return this.cartList.cartInfoList||[];
      },
      //计算购买产品总价
      totalPrice(){//还需要修改，修改为勾选产品的总价，而不是购物车里面所有物品的总价
        let sum=0;
        for(let cart of this.cartInfoList){
          sum+=cart.skuPrice*cart.skuNum;
        }
        return sum;
      },
      isAllChecked(){
        return this.cartInfoList.every(item=>item.isChecked===1);
      }
    }
  }
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 25%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 12%;
        }

        .cart-list-con5 {
          width: 13%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: center;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 32px;
            float: center;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: center;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
