import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: null as null | {
      id: string
      email: string
      roles: string[]
    }
  }),
  actions: {
    login(payload: { token: string, user: any }) {
      this.token = payload.token
      this.user = payload.user
      localStorage.setItem('userSession', JSON.stringify(this.$state))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('userSession')
    },
    hydrate() {
      const data = localStorage.getItem('userSession')
      if (data) Object.assign(this, JSON.parse(data))
    }
  }
})

export function getUserToken() {
  const session = localStorage.getItem('userSession')
  if (!session) return ''
  try {
    return JSON.parse(session).token || ''
  } catch {
    return ''
  }
}
