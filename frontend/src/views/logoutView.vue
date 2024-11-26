<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  localStorage.removeItem('my_auth_token')
  router.replace('/login')
}
</script>

<template>
  <button @click="handleLogout">Logout</button>
</template>
