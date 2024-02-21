import mongoose, { Model } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { Schema } = mongoose

try {
  const m = await mongoose.connect(process.env.DB_URI)
  console.log(m.connection.readyState === 1 ? "Connected to MongoDB" : "Failed to connect to MongoDB")
} catch (error) {
  console.log(error)
}

// Define mongoose disconnect
const closeConnection = () => {
  console.log("Disconnecting from MongoDB...")
  mongoose.disconnect()
}

// Define update schema
const updateSchema = new Schema({
  activity: String,
  date: String,
  cost: Number,
  notes: String
})

const UpdateModel = mongoose.model('Update', updateSchema)

export { UpdateModel, closeConnection }