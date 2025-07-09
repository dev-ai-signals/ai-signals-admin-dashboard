import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useUserStore } from '@/shared/stores/user'
import Dashboard from '@/pages/Dashboard.vue'
import UserManagement from '@/pages/UserManagement.vue'
import Subscriptions from '@/pages/Subscriptions.vue'
import AffiliateManagement from '@/pages/AffiliateManagement.vue'
import RewardWithdrawal from '@/pages/RewardWithdrawal.vue'
import Notification from '@/pages/Notification.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', redirect: '/login' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'user-management', name: 'UserManagement', component: UserManagement },
      { path: 'subscriptions', name: 'Subscriptions', component: Subscriptions },
      { path: 'affiliate-management', name: 'AffiliateManagement', component: AffiliateManagement },
      { path: 'reward-withdrawal', name: 'RewardWithdrawal', component: RewardWithdrawal },
      { path: 'notification', name: 'Notification', component: Notification },
      { path: 'settings', name: 'Settings', component: Settings },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.hydrate()
  if (!userStore.token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
