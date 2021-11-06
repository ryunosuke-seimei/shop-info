import Vue from 'vue'
import VueRouter from 'vue-router'

import shop from "@/views/shop-four"
import kura from "@/views/shop-kura"


Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/shop",
      component: shop
    },{
      path: "/kura",
      component: kura
    },
    {
      path:"*",
      redirect:"/"
    }
  ],
  // base: "/Room"

})

export default router