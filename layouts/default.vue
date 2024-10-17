<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const userStore = useUserStore()

onMounted(() => {
  const token = userStore.token || process.client && localStorage.getItem("token")
  if (!token) {
    navigateTo('/')
  }
})


</script>
