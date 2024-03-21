import express from 'express'
import { UserModel } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserClass from '../data_structures.js'

const router = express.Router()

function generateJWT(user) {
    return jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1w'})
}

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
    const usernameLower = username.toLowerCase()
    const saltRounds = 10  // Add 10 rounds of salt for bcrypt
    try {
        const salt = await bcrypt.genSalt(saltRounds)  // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt)  // Hash password
        const user = new UserModel({ username: usernameLower, password: hashedPassword, salt })  // Create new user model instance
        await user.save()
        res.send("User created successfully")
    } catch (error) {
        res.status(400).send({ error: "Something went wrong"})
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const usernameLower = username.toLowerCase()
    const user = await UserModel.findOne({ username: usernameLower})
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const username = { name: user }
            const accessToken = generateJWT(user)
            const formattedUser = new UserClass(user)
            res.send({
                message: "Signed in!",
                user: formattedUser,
                accessToken: accessToken,
                userId: user._id
            })
        } else {
            res.status(404).send({ message: "Invalid username or password" })
        }
    } else {
        res.status(404).send({ message: "Invalid username or password" })
    }

})

export default router