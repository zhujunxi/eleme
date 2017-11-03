import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

Vue.use(Router)

var router = new Router({
  routes: [
    {path: '/',redirect:'/Goods'},
    {path: '/Goods',component: Goods},
    {path: '/Ratings',component: Ratings},
    {path: '/Seller',component: Seller},
  ],
  linkActiveClass:'active'
})

export default router
