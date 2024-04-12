import express from 'express'
import { UpdateModel, UserModel } from '../db.js'
import multer from 'multer'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import sharp from 'sharp'
import dotenv from 'dotenv'

dotenv.config()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

// Create new S3 client
const s3 = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SACCESS_KEY,
    },
})

async function uploadToS3(file, updateId) {

    if (!file) {
        return { error: "No file"}
    }

    let buffer = await sharp(file.buffer).resize({ height: 1169, width: 828, fit: "contain" }).toBuffer()

    const params = {
        Bucket: process.env.IMG_BUCKET,
        Key: file.originalname,
        Body: buffer,
        ContentType: file.mimetype,
    }

    try {
        const command = new PutObjectCommand(params)
        const update = await UpdateModel.findById(updateId)
        if (update.img) {
            await s3.send(new DeleteObjectCommand({ Bucket: process.env.IMG_BUCKET, Key: update.img }))
        }
        update.img = file.originalname
        const url = await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.IMG_BUCKET, Key: file.originalname }, { expiresIn: 604800 }))
        update.imgUrl = url
        await update.save()
        return await s3.send(command)
    } catch (err) {
        console.log(err)
    }
}

router.post('/update/:id', upload.single("image"), async (req, res) => {
    const updateId = req.params.id
    const file = req.file

    const result = await uploadToS3(file, updateId)

    res.send(result)

})

export default router