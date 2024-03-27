import express from 'express'
import { UpdateModel, UserModel } from '../db.js'

const router = express.Router()

// Find all updates
router.get('/', async (req, res) => {
  res.send(await UpdateModel.find())
})

// Find single update
router.get('/:id', async (req, res) => {
  const updateId = req.params.id
  const listUpdates = await UpdateModel.findById(updateId)
  res.send(listUpdates)
})

// Create new update
router.post('/new', async (req, res) => {
  try {
    const newUpdate = await (await UpdateModel.create(req.body))
    res.status(201).send(newUpdate)
  } 
  catch (error) {
    console.log({error: error.message})
  }
})

// Update existing update
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await UpdateModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (updatedEntry) {
      res.status(200).send({updatedEntry})
    } else {
      res.status(404).send({message: "Entry not found"})
    }
  } 
  catch (error) {
    res.status(404).send({error: error.message})
  }
})

// Delete update
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await UpdateModel.findByIdAndDelete(req.params.id)
    if (deletedEntry) {
      res.sendStatus(204)
    } else {
      res.status(404).send({message: "Update not found"})
    }
  }
  catch (error) {
    res.send({message: error.message})
  }
})

export default router