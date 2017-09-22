<template lang="html">
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click="removeCart($event)">
      <span> - </span>
    </div>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-increase" @click="addCart($event)">
      <span> + </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if(!event._constructed){
        return;
      }
      if(!this.food.count) { // <0  => false
        Vue.set(this.food, 'count', 1)
      }else {
        this.food.count ++
      }
    },
    removeCart(event) {
      if(!event._constructed){
        return;
      }
      if(this.food.count) {  // >0  => true
        this.food.count --
      }
    }
  }
}
</script>

<style lang="css">
.cart-count{
  display: inline-block;
  vertical-align: top;
  width: 12px;
  line-height: 20px;
  text-align: center;
  color: #CCC;
  font-size: 12px;
}
.cart-decrease{
  display: inline-block;
  vertical-align: top;
}
.cart-decrease span{
  height: 16px;
  line-height: 16px;
  width: 16px;
  display: inline-block;
  border: 1px solid rgb(31, 161, 249);
  color: #FFF;
  border-radius: 50%;
  text-align: center;
  background-color: rgb(31, 161, 249);
}
.cart-increase{
  display: inline-block;
  vertical-align: top;
}
.cart-increase span{
  height: 16px;
  line-height: 16px;
  width: 16px;
  display: inline-block;
  border: 1px solid rgb(31, 161, 249);
  color: #FFF;
  border-radius: 50%;
  text-align: center;
  background-color: rgb(31, 161, 249);
}
</style>
