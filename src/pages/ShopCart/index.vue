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
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" @change="updateCheckCartById(cartInfo.skuId,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handelNum('mins',-1,cartInfo)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="handelNum('input',$event.target.value*1,cartInfo)" @input="handelInput" />
            <a href="javascript:void(0)" class="plus" @click="handelNum('add',1,cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice*cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cartInfo.skuId)">删除</a>
            <br>
            <a >移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateCheckCartAll($event.target.checked?1:0)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCartAll">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getCartList()
    },
    methods: {
      getCartList(){
        this.$store.dispatch("getCartList")
      },
      handelInput(event){
        event.target.value = event.target.value.replace(/\D/g,'').replace(/^0*/,'').slice(0,8)
      },
      async handelNum(type,disNum,cartItem){
        switch (type) {
          case 'add':
            disNum = 1
            break;
          case 'mins':
            disNum = cartItem.skuNum > 1? -1:0
            break;
          case 'input': 
            if(isNaN(disNum) || disNum < 1){
              disNum = 0
            }else{
              disNum = parseInt(disNum) - cartItem.skuNum
            }    
            break;
        }
        // 向服务器发送请求
        try {
          // 修改购物车商品数量
          await this.$store.dispatch("adOrUpdateShopCart",{skuId:cartItem.skuId, skuNum:disNum})

          // 更新购物车信息
          this.getCartList()
        } catch (error) {
          alert("修改失败")
        }
      },
      async deleteCartById(skuId){
        try {
          await this.$store.dispatch("deleteCartById",skuId)
          // 更新购物车信息
          this.getCartList()
        } catch (error) {
          alert("删除商品失败")
          console.log(error);
        }
      },
      async updateCheckCartById(skuId,isChecked){
        
        isChecked = isChecked?1:0
        try {
          await this.$store.dispatch("updateCheckCartById",{skuId,isChecked})
          // 更新购物车信息
          this.getCartList()
        } catch (error) {
          alert("商品选中状态切换失败")
          console.log(error);
        }
      },
      async deleteCartAll(){
        try {
          await this.$store.dispatch("deleteCartAll")
          // 更新购物车信息
          this.getCartList()
        } catch (error) {
          alert("部分商品删除失败")
          console.log(error);
        }
        
      },
      async updateCheckCartAll(isChecked){
        try {
          await this.$store.dispatch("updateCheckCartAll",isChecked)
          // 更新购物车信息
          this.getCartList()
        } catch (error) {
          alert("操作失败")
          console.log(error);
        }
      }
    },
    computed:{
      // 购物车数据
      ...mapGetters(["cartInfoList"]),
      // 计算购买产品的总价格
      totalPrice(){
        return this.cartInfoList.reduce((pre,current)=>{ 
          return pre + (current.isChecked? current.skuPrice * current.skuNum : 0)
        },0)
      },
      // 判断底部复选框是否勾选
      isAllCheck(){
        return this.cartInfoList.length > 0 && this.cartInfoList.every(current=>current.isChecked)
        
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

        &>div {
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

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

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
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              cursor: pointer;
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