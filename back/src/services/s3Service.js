import {DeleteObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import s3 from '../config/s3.js';
import path from 'path';

class S3Service {
    constructor(bucketName = process.env.S3_BUCKET_NAME, region = process.env.AWS_REGION) {
        this.bucketName = bucketName;
        this.region = region;
    }

    upload = async (file) => {
        if (!file || !file.buffer || !file.originalname) {
            throw new Error('Invalid file');
        }

        const ext = path.extname(file.originalname);
        const key = `images/${Date.now()}-${file.fieldname}${ext}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3.send(command);

        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }
    getKeyFromUrl = (url) => {
        try {
            const urlObj = new URL(url);
            const parts = urlObj.pathname.split('/');
            return parts.slice(1).join('/');
        } catch (err) {
            throw new Error('Invalid S3 URL');
        }
    }

    delete = async (url) => {
        const key = this.getKeyFromUrl(url);
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        });

        await s3.send(command);
        return true;
    }
}

export default S3Service;
