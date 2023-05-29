import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routes from './routes/index'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running')
})

export default app
