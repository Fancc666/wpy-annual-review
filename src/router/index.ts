import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  {
    path: '/main',
    component: () => import('@/views/HoldPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: ()=> import('@/views/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 本项目暂时不需要权限鉴定
 */
// router.beforeEach((to, from, next) => {
//   const user = useUserStore();
//   if (to.meta?.requiresAuth && !user.token) {
//     next('/login');
//     return;
//   }
//   if (to.meta?.permission === 'ADMIN' && user.permission !== 'ADMIN') {
//     alert("无权限");
//     next("/home");
//     return;
//   }
//   next();
// })

export default router
