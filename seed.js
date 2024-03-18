import { UpdateModel, UserModel, closeConnection } from './db.js'

const updates = [
  {
    "activity": "Oil change",
    "date": new Date("2024-02-08"),
    "cost": 199,
    "notes": "Toyota Croydon"
  },
  {
    "activity": "Brake rotors",
    "date": new Date("2023-12-08"),
    "cost": 459,
    "notes": "PP Automotive"
  },
  {
    "activity": "Tyre rotation",
    "date": new Date("2023-09-24"),
    "cost": 172,
    "notes": "Bob Jane T-Mart"
  }
]

const users = [
  {username: "Tom", password: "password"}
]

await UpdateModel.deleteMany()
console.log("Deleted updates")
await UserModel.deleteMany()
console.log("Deleted users")
const updateEntries = await UpdateModel.insertMany(updates)
console.log('Added updates')
const updateUsers = await UserModel.insertMany(users)
console.log('Added users')

closeConnection()