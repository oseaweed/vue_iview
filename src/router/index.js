import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import ViewUI from 'view-design';

Vue.use(VueRouter)
const LOGIN_PAGE_NAME = 'login'


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

// 路由守卫
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  if (to.name === LOGIN_PAGE_NAME) {
    sessionStorage.clear();
  }
  const token = sessionStorage.getItem('token')
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'layout' // 跳转到homeName页
    })
  } else {

  }
})
router.afterEach(to => {
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})
export default router
