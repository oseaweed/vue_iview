import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout';
import Login from '../views/login/Login';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }

]
// 解决同一路由多次添加报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
