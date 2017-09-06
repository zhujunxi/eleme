<template lang="html">
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div @click="detailShow = true" v-if="seller.supports" class="supports-count">
        <span class="count">{{seller.supports.length}}个 ></span>
      </div>
    </div>
    <div @click="detailShow = true" class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="">></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close">
        X
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type:Object
    }
  },
  data() {
    return {
      detailShow:false,
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee'];
  },
  methods: {
    showDetail:function () {
      this.detailShow = true
    }
  }
}
</script>

<style scoped>
  .header{
    color: #FFF;
    position: relative;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .avatar img{
    border-radius: 2px;
  }
  .content{
    display: inline-block;
    margin-left: 16px;
  }
  .title{
    margin: 2px 0 8px 0
  }
  .brand{
    width: 30px;
    height: 18px;
    display: inline-block;
    vertical-align: top;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(./brand@2x.png)
  }
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio:3){
    background-image: url(./brand@3x.png)
  }
  .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .supports .icon{
    display: inline-block;
    height: 12px;
    width: 12px;
    margin-right:4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .supports .icon.decrease{
    background-image: url(decrease_1@3x.png)
  }
  .supports .icon.discount{
    background-image: url(discount_1@3x.png)
  }
  .supports .icon.guarantee{
    background-image: url(guarantee_1@3x.png)
  }
  .supports .icon.special{
    background-image: url(special_1@3x.png)
  }
  .supports .icon.invoice{
    background-image: url(invoice_1@3x.png)
  }
  .text{
    line-height: 14px;
    font-size: 10px;
  }
  .supports-count{
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .supports-count .count{
    font-size: 10px;
  }

  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding:0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7, 17, 27, 0.2);
  }
  .bulletin-title{
    display: inline-block;
    vertical-align: top;
    width: 22px;
    height: 12px;
    background-image: url(bulletin@3x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 8px;
  }
  .bulletin-text{
    margin: 0 4px;
    font-size: 12px;
    font-weight: 200;
    vertical-align: top;
  }
  .detail{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    background-color: rgba(7, 17, 27, 0.8);
  }
  .detail-wrapper{
    min-height: 100%;

  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear:both;
    font-size: 32px;
  }
</style>
