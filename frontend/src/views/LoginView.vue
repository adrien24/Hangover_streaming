<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuth } from '@toneflix/vue-auth'
import { useRouter } from 'vue-router'
import type { LoginData } from '@/views/enteties/login.enteties'

const router = useRouter()
const { login } = useAuth()

const form = reactive({ username: 'user1', password: 'password' })
const data = ref<LoginData>({ user: [], token: undefined, error: undefined })

const handleLogin = async () => {
  data.value = await login(form)
  console.log(data.value)
  if (!data.value.error) router.replace('/')
}
</script>

<template>
  <div class="column-container">
    <input v-model="form.username" placeholder="username Address" />

    <input v-model="form.password" placeholder="Password" type="password" />

    <button @click="handleLogin">Login</button>
    <p class="error" v-if="data.error">
      {{ data.error.message }}
    </p>
  </div>
</template>
