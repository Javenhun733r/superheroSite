import {PutObjectCommand} from "@aws-sdk/client-s3";
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
}

export default S3Service;
