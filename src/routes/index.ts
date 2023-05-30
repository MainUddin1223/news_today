import express from 'express'
import authRouter from './auth.rt'

const router = express.Router()

const defaultRoutes = [{ path: '/auth', route: authRouter.authRouter }]

defaultRoutes.forEach(route => {
  const apis = route.route.stack.map(path => {
    return { path: path.route.path, methods: path.route.methods }
  })
  apis.map(api => {
    console.log(api.methods, { route: api.path })
  })
  router.use(route.path, route.route)
})
export default router
