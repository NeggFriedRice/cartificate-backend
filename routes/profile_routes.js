import express from 'express'
import { UpdateModel, UserModel } from '../db.js'
import UserClass from '../data_structures.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    try {
    const user = await UserModel.findOne({_id: userId})
    if (user) {
        const formattedUser = new UserClass(user)
        res.send(formattedUser)
    } 
    } catch (err) {
        res.send({message: err})
    }
})

router.put('/:id/update', async (req, res) => {
    const userId = req.params.id
    const updatedProfile = await UserModel.findByIdAndUpdate(userId, {vehicle: req.body} , {new: true})
    
    if (updatedProfile) {
        const formattedUser = new UserClass(updatedProfile)
        res.send(formattedUser)
    }
})

export default router