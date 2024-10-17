import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'

type userState = {
  token: string | null;
  user: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): userState => ({
    token: null,
    user: null,
  }),
  actions: {
    async login(credentials: { user_id: string, password: string }) {
      const { $api }: any = useNuxtApp()
      try {
        const { data } = await $api.post('/login', credentials)
        this.token = data.token
        if (process.client) {
            localStorage.setItem('token', data.token)
        }
        await this.getUser()
        navigateTo('/todo')
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    async register(userData: { user_id: string, password: string, name: string }) {
      const { $api }: any = useNuxtApp()
      try {
        const { data } = await $api.post('/register', userData)
        console.log("data", data);
        this.token = data.token
        if (process.client) {
            localStorage.setItem('token', data.token)
        }
        await this.getUser()
        navigateTo('/')
      } catch (error) {
        console.error('Registration error:', error)
      }
    },
    async getUser() {
      const { $api }: any = useNuxtApp()
      try {
        const { data } = await $api.get('/me', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = data
      } catch (error) {
        console.error('User not found:', error)
      }
    },
    setToken () {
      this.token = localStorage.getItem('token')
    },
    logout() {
      this.token = null
      this.user = null
      if (process.client) {
        localStorage.removeItem('token')
      }
      navigateTo('/')
    }
  }
})
