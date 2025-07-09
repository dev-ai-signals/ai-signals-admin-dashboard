import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/main.scss'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

import { useUserStore } from '@/shared/stores/user'
const userStore = useUserStore()
userStore.hydrate()

app.use(router)
app.mount('#app')
