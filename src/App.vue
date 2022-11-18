<template>
  
  <div id="app">
    <!-- <h1 v-upper="msg"></h1> -->
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: "App",
  data() {
    return {
      msg:"abc"
    }
  },
  components: {
    Header,Footer
  },
  methods: {
    show(){
      console.log(this);
    }
  },
  mounted() {
    // 派发一个action||获取商品分类的三级列表的数据   只发一次请求，考虑性能
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
    .fade-leave-to{
      display: none;
    }
</style>
