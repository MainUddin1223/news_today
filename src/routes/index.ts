import express from 'express';
import authRouter from './auth.rt';
import newsRouter from './reporter.rt';
import adminRouter from './admin.rt';
import editorRouter from './editor.rt';
import publicRouter from './public.rt';

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRouter.authRouter },
  { path: '/reporter', route: newsRouter.newsRouter },
  { path: '/admin', route: adminRouter.adminRouter },
  { path: '/editor', route: editorRouter.editorRouter },
  { path: '/public', route: publicRouter.publicRouter },
];

defaultRoutes.forEach(route => {
  const apis = route.route.stack.map(path => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map(api => {
    console.log([api.methods, { route: `${route.path}${api.path}` }]);
  });
  router.use(route.path, route.route);
});
export default router;
