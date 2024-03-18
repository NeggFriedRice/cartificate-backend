import express, { application } from 'express'
import { UserModel } from '../db'

const router = express.Router()

router.get('/users/all', (req, res) => {
    res.send(UserModel.findOne())
})