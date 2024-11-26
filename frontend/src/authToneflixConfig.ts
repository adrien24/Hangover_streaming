// import { authPlugin } from '@toneflix/vue-auth'
// import router from '@/router/index'

// interface User {
//   role?: string;
// }

// const auth = authPlugin({
//   router,
//   baseUrl: 'http://localhost:5050',
//   endpoints: {
//     login: '/api/auth/login',
//     register: '/api/auth/register',
//     logout: '/api/auth/logout',
//   },
//   storageKey: 'auth_token',
//   transformResponse: (data) => ({ user: data.data, token: data.token }),
//   middlewares: [
//     (to, from, next, { isAuthenticated }) => {
//       // Example middleware function
//       if (!isAuthenticated && to.name !== 'login') {
//         return next({ name: 'login' })
//       }
//       next()
//     },
//     (to, from, next, { user }: { user: User }) => {
//       if (user?.role !== 'admin' && to.meta.requiresAdmin) {
//         return next({ name: 'not-authorized' })
//       }
//       next()
//     },
//   ],
// })

// // Use the auth variable to avoid the unused variable error
// export default auth
