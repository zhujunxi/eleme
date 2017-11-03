<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/Goods" class="tab-item" tag="a">商品</router-link>
      <router-link to="/Ratings" class="tab-item" tag="a">评论</router-link>
      <router-link to="/Seller" class="tab-item" tag="a">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import vHeader from 'components/v-header/v-header'
const ERR_OK = 0
export default {
  data(){
    return{
      seller:{}
    }
  },
  created(){
    axios.get('/api/seller').then(response => {
      const {data, errno} = response.data

      if(errno === ERR_OK){
        this.seller = data
        console.log(this.seller);
      }

    })
  },
  components:{
    vHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import "./common/stylus/mixin.styl";
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,.1))
    .tab-item
      flex: 1
      text-align:center
      display:block
      color:rgb(77, 85, 93)
      &.active
          color:rgb(240,20,20)

  /*.tab{
    display: flex;
    display: -webkit-flex;
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
  }*/
</style>
