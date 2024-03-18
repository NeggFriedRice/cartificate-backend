import express from 'express'
import { UserModel } from '../db.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/users/', async (req, res) => {
    try {
      res.send(await UserModel.find())
    }
    catch (error) {
      console.log(error)
    }
  })

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const saltRounds = 10  // Add 10 rounds of salt for bcrypt
    try {
        const salt = await bcrypt.genSalt(saltRounds)  // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt)  // Hash password
        const user = new UserModel({ username, password: hashedPassword, salt })  // Create new user model instance
        await user.save()
        res.send("User created successfully")
    } catch (error) {
        res.status(400).send({ error: "Something went wrong"})
    }
})

export default router