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


// Define user schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  vehicle: {
    brand: { type: String, default: "" },
    model: { type: String, default: "" },
    year: { type: String, default: "" },
    registration: { type: String, default: "" },
    vin: { type: String, default: "" }
  }
})

const UserModel = mongoose.model('User', userSchema)

// Define update schema
const updateSchema = new Schema({
  activity: { type: String },
  date: { type: Date },
  cost: { type: Number },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const UpdateModel = mongoose.model('Update', updateSchema)

export { UpdateModel, UserModel, closeConnection }