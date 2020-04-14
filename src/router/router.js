// 导入 vue
import Vue from 'vue'
// 1. 安装路由 npm i vue-router - S

// 2. 导入路由 
import VueRouter from 'vue-router'

// 导入 登录组件
import login from '@/view/login/login.vue'

// 3.注册路由
Vue.use(VueRouter)

// 4 实例化路由
const router = new VueRouter({
    // 路由配置
    routes: [
        // 登录页路由
        {
            path: "/",
            component: login
        }
    ]
});
// 5. 导入出去
export default router
