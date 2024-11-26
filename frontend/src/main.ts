import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authPlugin } from '@toneflix/vue-auth'
import axios from 'axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const auth = authPlugin({
  router,
  baseUrl: 'http://localhost:5050',
  storageKey: 'my_auth_token',
  endpoints: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  },
  middlewares: [
    async (to, from, next, { isAuthenticated }) => {
      if (!isAuthenticated && to.name !== 'login') next({ name: 'login' })
      else next()
    },
  ],
})

await axios
  .get('http://localhost:5050/api/auth/verifyToken', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('my_auth_token')}`,
    },
  })
  .then()
  .catch(() => {
    localStorage.removeItem('my_auth_token')
    router.push('/login')
  })

app.use(auth)
app.use(router)

app.mount('#app')
