import Vue from 'vue'
import App from './App.vue'
// 导入 element插件
import ElementUI from 'element-ui';
// 导入 element的css文件
import 'element-ui/lib/theme-chalk/index.css';


// 注册 element
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
