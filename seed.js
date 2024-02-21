import { UpdateModel, closeConnection } from './db.js'

const updates = [
  {
    "activity": "Oil change",
    "date": "Feb 08 2024",
    "cost": 199,
    "notes": "Toyota Croydon"
  },
  {
    "activity": "Brake rotors",
    "date": "Dec 08 2023",
    "cost": 459,
    "notes": "PP Automotive"
  },
  {
    "activity": "Tyre rotation",
    "date": "Sep 24 2023",
    "cost": 172,
    "notes": "Bob Jane T-Mart"
  }
]

await UpdateModel.deleteMany()
console.log("Deleted updates")
const updateEntries = await UpdateModel.insertMany(updates)
console.log('Added updates')

closeConnection()