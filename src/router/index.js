import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

// 路由映射数组
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout'),

    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/layout/qa')
      },
      {
        path: 'my',
        component: () => import('@/views/layout/my'),

      },
      {
        path: 'video',
        component: () => import('@/views/layout/video')
      },
    ]
  },
  {
    path: '/my/collect',
    component: () => import('@/views/layout/my/collect'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/my/history',
    component: () => import('@/views/layout/my/history'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if (to.meta.isLogin && !store.getters.token) return next('/login?url=' + to.path)
  next()
})
export default router
