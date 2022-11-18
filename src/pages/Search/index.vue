<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌名的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTradeMake">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a>综合<i v-if="isOne" class="iconfont" :class="{'icon-up':currentSort, 'icon-down':!currentSort}"></i></a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder('2')">
                  <a>价格<i v-if="isTwo" class="iconfont" :class="{'icon-up':currentSort, 'icon-down':!currentSort}"></i></a>
                </li>
                
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="{
                      name:'detail',
                      params:{skuId:good.id}
                    }">
                      <img v-lazy="good.defaultImg ? good.defaultImg : '#'"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      :title="good.title"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        
          <!-- 分页器 -->
          <Pagination 
          :pageInfo="{
            pageNo: searchParams.pageNo,
            pageSize: searchParams.pageSize,
            totalCount: total,
            continues: 5
          }"
          @getPageNo="getPageNo"
          />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import Pagination from '@/components/Pagination'
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchParams: {
        // 产品相应的id
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        // 产品的名字
        categoryName: undefined,
        // 搜索的关键词
        keyword: undefined,
        // 排序：初始状态应该是综合且降序
        order: "1:desc",
        // 第几页
        pageNo: 1,
        // 每一页展示条数
        pageSize: 10,
        // 平台属性的操作
        props: [],
        // 品牌
        trademark: undefined,
      },
    };
  },
  //在挂载之前调用一次|可以在发请求之前将带有参数进行修改
  beforeMount() {
    // 整理发送参数
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  mounted() {
    // 请求数据
    this.getData()
   
  },
  methods: {
    // 发送请求
    getData(){
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName(){

       //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

      this.$router.push({
        name:"search",
        params:this.$route.params
      })
    },
    // 删除关键字
    removeKeyWord(){
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined 
      // 发送路由
      this.$router.push({
        name:"search",
        query:this.$route.query
      })
      // 通知Header组件清空关键字
      this.$bus.$emit("clean")
    },
    // 自定义事件的回调
    trademarkInfo(trademark){
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    // 删除品牌名
    removeTradeMake(){
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.trademark = undefined 
      // 发送请求
      this.getData()
    },
    // 收集售卖属性的回调函数
    attrInfo(attr, attrValue){
      // ["属性ID:属性值:属性名"]
      // 整理props参数
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`

      // 数组去重
      const tempArr = this.searchParams.props
      tempArr.push(props)
      // 将去重后的数组赋值props
      this.searchParams.props = [...new Set(tempArr)]
      // 发送请求
      this.getData()
    },
    // 删除售卖的属性
    removeAttr(index){
      // 整理参数
      this.searchParams.props.splice(index,1)
      // 发送请求
      this.getData()
    },
    // 排序的操作
    changeOrder(flag){
      //  flag形参，1代表综合，2代表价格
      let originOrder = this.searchParams.order
      let originFlag = originOrder.split(':')[0]
      let originSort = originOrder.split(':')[1]

      if(originFlag === flag){
        // 修改升序和降序
        this.searchParams.order = originSort === 'desc'? `${flag}:asc` : `${flag}:desc`
      }else{
        // 修改排列方式，综合或者价格
        this.searchParams.order = `${flag}:desc`
      }
      this.getData()
    },
    // 获取页码的回调函数
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  computed: {
    ...mapGetters(["goodsList","total"]),
    isOne(){
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') != -1
    },
    currentSort(){
      return this.searchParams.order.indexOf('asc') != -1
    }
  },
  watch:{
    $route(){
      // 整理发送参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // 请求数据
      this.getData()
      // 重置上一条数据
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
    }
  },
  components: {
    SearchSelector,
    Pagination
  },
};
</script>

<style lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    width: 100%;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  // i {
                  //   margin-left: -5px;
                  // }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>