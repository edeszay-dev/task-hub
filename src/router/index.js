import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { title: '登录 - TaskHub', requiresAuth: false }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
            title: '我的工作台',
            requiresAuth: true,
            breadcrumb: '首页'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 修复后的路由守卫（去掉了被废弃的 next 参数）
router.beforeEach((to, from) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

    // 如果去首页但没登录 -> 跳转去登录
    if (to.meta.requiresAuth && !isAuthenticated) {
        return '/login'
    }
    // 如果已登录还想去登录页 -> 回首页
    if (to.path === '/login' && isAuthenticated) {
        return '/'
    }
    // 其他情况默认放行
})

export default router