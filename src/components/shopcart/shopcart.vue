<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="totalCount > 0 ?'highlight':''">
            <i class="icon-shopping-cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="totalPrice > 0 ?'active':''">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费 ￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    selectFoods: {
      type: Array,
      default() {
        return [{
          price:12,count:1
        }]
      }
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    minPrice:{
      type:Number,
      default:0
    }
  },
  computed:{
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total;
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count;
    },
    payDesc() {
      if(this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      }else if(this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`
      }else {
        return '去结算'
      }
    },
    payClass() {
      return this.totalPrice < this.minPrice ?'':'enough'
    }
  }
}
</script>

<style lang="css" scoped>
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 45px;
  }
  .content{
    display: flex;
    background-color: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
  }
  .content-left{
    flex:1 ;
  }
  .content-right{
    flex:0 0 105px;
    width: 105px;
  }
    .logo-wrapper{
      display: inline-block;
      position: relative;
      top: -10px;
      margin: 0 12px;
      padding: 6px;
      width: 56px;
      height: 56px;
      box-sizing: border-box;
      vertical-align: top;
      border-radius: 50%;
      background-color: #141d27;
    }
    .logo{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #2b343c;
    }
    .logo.highlight{
      background-color: rgb(0, 160, 220);
    }
    .num{
      position: absolute;
      top: 0;
      right: 0;
      min-width: 24px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 16px;
      font-size: 9px;
      font-weight: 700;
      color: #FFF;
      background: rgb(240, 20, 20);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    }
    .price{
      display: inline-block;
      vertical-align: top;margin-top: 12px;
      padding-right: 12px;
      border-right: 1px solid rgba(255,255,255,.1);
      line-height: 24px;
      font-size: 16px;
      font-weight: 700;
    }
    .price.active{
      color: #FFF;
    }
    .desc{
      display: inline-block;
      vertical-align: top;
      line-height: 24px;
      margin: 12px 0 0 12px;
      font-size: 12px;
    }
    .content-right .pay{
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      background: #26333b;
    }
    .pay.enough{
      background: #00b43c;
      color: #FFF;
    }
</style>
