// plugins/api.ts
import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:3030/api',
  })

  // Provide the Axios instance globally
  nuxtApp.provide('api', api)
})
