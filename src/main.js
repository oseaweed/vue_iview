import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/assets/styles/main.scss';
import '@/assets/styles/theme.less'
// mock数据配置
if (process.env.NODE_ENV !== 'production') require('@/mock')
// 控制台消息提示的环境配置（false---生产环境）
Vue.config.productionTip = false
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
