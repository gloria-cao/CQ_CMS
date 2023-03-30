import { LOGIN_TOKEN } from '@/global/constance'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 配置映射关系 ：path => components
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      // 路由懒加载
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/home',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  // 通过判断token是否有值来进行跳转
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path == '/home' && !token) {
    return '/login'
  }
})

export default router
