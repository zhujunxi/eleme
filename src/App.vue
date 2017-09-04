<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <router-link to="/Goods" class="tab-item" tag="div">商品</router-link>
      <router-link to="/Ratings" class="tab-item" tag="div">评论</router-link>
      <router-link to="/Seller" class="tab-item" tag="div">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import vHeader from 'components/v-header/v-header'

export default {
  data(){
    return{
      seller:{}
    }
  },
  created(){
    axios.get('/api/seller').then(response => {
      console.log(response);
    })
  },
  components:{
    vHeader
  }
}
</script>

<style>
@import "../static/css/reset.css";
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;

  }
  .tab-item{
    flex: 1;
    text-align: center;
  }
  .router-link-active{
    color:rgba(240, 20, 20,1);
  }
</style>
