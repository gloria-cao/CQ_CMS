import { LOGIN_TOKEN } from '@/global/constance'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 配置映射关系 ：path => components
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/login',
      name: 'login',
      // 路由懒加载
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
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
  if (to.path.startsWith('/home') && !token) {
    return '/login'
  }
  // 加载第一个动态路由
  if (to.path === '/home') return firstMenu?.component
})

export default router
