import Vue from 'vue'
import App from './App.vue'
// 导入 element插件
import ElementUI from 'element-ui';
// 导入 element的css文件
import 'element-ui/lib/theme-chalk/index.css';

// // 导入 路由 vue-router
// import VueRouter from 'vue-router'
// // 注册 路由
// Vue.use(VueRouter)
// // 实例化路由
// const router = new VueRouter({
//   // 写相应的路由配置
//     routes: []
// })

// 导入路由实例化对象
import router from '@/router/router.js'


// 注册 element
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  // 把路由注入到vue实例中
  router,
  render: h => h(App),
}).$mount('#app')
