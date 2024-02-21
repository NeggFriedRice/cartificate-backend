// Import express
import express from 'express'
import router from './routes/update_routes.js'
import cors from 'cors'

// Create instance of express
const app = express()
// Choose port to run on
const port = 4002

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/updates', router)

app.get('/', (req, res) => {
  res.send({
    message: "Hello there!"})
})

app.listen(port, () => {
  console.log("Now listening on port " + port)
})
