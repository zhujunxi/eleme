<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          class="menu-item"
          :class="currentIndex == index ?'active':''"
          @click="selectMenu(index, $event)"
          >
          <span v-show="item.type > 0" class="icon"></span>
          <span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <shopcart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods"
      ></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
const ERR_OK = 0
export default {
  data() {
    return {
      goods:[],
      listHeight:[],
      scrollY: 0
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    var self = this;
    axios.get('/api/goods').then(response => {
      const {data, errno} = response.data
      if(errno === ERR_OK) {
        this.goods = data;
        this.$nextTick(function () {
          this._initScroll()
          this._calcHeight()
        })

        //console.log(this.goods);
      }
    })

  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click:true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click:true
      });

      this.foodsScroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calcHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i=0;i<foodList.length;i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if(!event._constructed){
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index]

      this.foodsScroll.scrollToElement(el,300)
    }
  },
  computed: {
    currentIndex() {
      for(let i=0;i<this.listHeight.length;i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i+1];
        if( !height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components: {
    shopcart, cartcontrol
  }
}
</script>

<style lang="css"  scoped>
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    width: 100%;
    bottom: 46px;
    overflow: hidden;
  }
  .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background-color: #F3F5F7
  }
  .menu-item{
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }
  .menu-item.active{
    font-weight: 700;
    background-color: #FFF;
    position: relative;
    z-index: 10;
    margin-top: -1px;
  }
  .menu-item.active .text{
    border: none;
  }
  .menu-item .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .foods-wrapper{
    flex: 1
  }
  .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 14px;
    color: rgb(147, 153, 159);
    background: #F3F5F7;
  }
  .food-item{
    display: flex;
    margin: 18px ;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .food-item:last-child{
    border-bottom: none;
  }
  .food-item .icon{
    flex:0 0 57px;
    width: 57px;
    height: 57px;
    margin-right: 10px;
  }
  .food-item .content{
    flex: 1;
    position: relative;
  }
  .food-item .content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food-item .content .desc{
    margin: 0px 0 8px 0;
    //height: 10px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food-item .content .extra{
    height: 10px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .count{
    margin-right: 12px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;
  }
  .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 0px;
    display: block;
  }
</style>
