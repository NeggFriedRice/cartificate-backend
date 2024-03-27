// Import express
import express from 'express'
import updatesRouter from './routes/update_routes.js'
import authRouter from './routes/auth.js'
import profileRouter from './routes/profile_routes.js'
import cors from 'cors'

// Create instance of express
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/updates', updatesRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)

app.get('/', (req, res) => {
  res.send({
    message: "Hello there!"})
})

app.listen(process.env.PORT, () => {
  console.log("Now listening on port " + process.env.PORT)
})
