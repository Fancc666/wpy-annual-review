import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('@/views/HoldPage.vue') },
  {
    path: '/home',
    component: () => import('@/views/HoldPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ()=> import('@/views/HoldPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = useUserStore();
  if (to.meta?.requiresAuth && !user.token) {
    next('/login');
    return;
  }
  if (to.meta?.permission === 'ADMIN' && user.permission !== 'ADMIN') {
    alert("无权限");
    next("/home");
    return;
  }
  next();
})

export default router
