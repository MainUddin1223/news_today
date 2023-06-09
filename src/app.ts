import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req: Request, res: Response, next: NextFunction) => {
//   logger.info(req.body);
//   const oldSend = res.send;
//   res.send = function (...args): Response {
//     if (res.statusCode >= 400) {
//       logger.info(args[0]);
//     } else {
//       logger.info(`yesssssss ${res.statusCode}`);
//     }
//     return oldSend.apply(res, args);
//   };
//   next();
// });

app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

export default app;
