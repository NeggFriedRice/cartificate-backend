import express from 'express'
import { UpdateModel, UserModel } from '../db.js'
import multer from 'multer'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from 'sharp'
import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import randomString from 'randomized-string'

dotenv.config()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SACCESS_KEY
})

async function uploadToS3(file, updateId) {

    // Check if file was sent with the POST request
    if (!file) {
        return { error: "No file"}
    }

    // Resize image to A5 size, limit img size to send to S3
    let buffer = await sharp(file.buffer).resize({ height: 1169, width: 828, fit: "contain" }).toBuffer()

    const params = {
        Bucket: process.env.IMG_BUCKET,
        // Randomise image key
        Key: randomString.generate(),
        Body: buffer,
        ContentType: file.mimetype
    }

    try {
        // Find the update in the database
        const update = await UpdateModel.findById(updateId)
        // If image already exists, delete it
        if (update.img) {
            s3.deleteObject({ Bucket: process.env.IMG_BUCKET, Key: update.img })
        }

        // Upload new image
        const url = await s3.upload(params).promise()
        update.imgUrl = url.Location
        await update.save()
    } catch (err) {
        res.status(400).send({error: err})
    }
}

router.post('/update/:id', upload.single("image"), async (req, res) => {
    const updateId = req.params.id
    const file = req.file

    const result = await uploadToS3(file, updateId)

    res.send(result)

})

export default router