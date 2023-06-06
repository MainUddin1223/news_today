import express from 'express'
import authRouter from './auth.rt'
import newsRouter from './newsReport.rt'
import adminRouter from './admin.rt'

const router = express.Router()

const defaultRoutes = [
  { path: '/auth', route: authRouter.authRouter },
  { path: '/news', route: newsRouter.newsRouter },
  { path: '/admin', route: adminRouter.adminRouter },
]

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
