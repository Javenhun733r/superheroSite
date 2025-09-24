import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from '../config/s3.js';
import path from 'path';

async function uploadToS3(file) {
    const ext = path.extname(file.originalname);
    const key = `images/${Date.now()}-${file.fieldname}${ext}`;

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3.send(command);

    const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return publicUrl;
}

export { uploadToS3 };
