export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/' && to.path !== '/register') {
    return navigateTo('/')
  }
})
