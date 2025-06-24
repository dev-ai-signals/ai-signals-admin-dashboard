import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import UserManagement from '@/pages/UserManagement.vue'
import Subscriptions from '@/pages/Subscriptions.vue'
import AffiliateManagement from '@/pages/AffiliateManagement.vue'
import RewardWithdrawal from '@/pages/RewardWithdrawal.vue'
import Notification from '@/pages/Notification.vue'
import Settings from '@/pages/Settings.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagement,
      },
      {
        path: 'subscriptions',
        name: 'Subscriptions',
        component: Subscriptions,
      },
      {
        path: 'affiliate-management',
        name: 'AffiliateManagement',
        component: AffiliateManagement,
      },
      {
        path: 'reward-withdrawal',
        name: 'RewardWithdrawal',
        component: RewardWithdrawal,
      },
      {
        path: 'notification',
        name: 'Notification',
        component: Notification,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
