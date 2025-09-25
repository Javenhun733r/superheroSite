import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import fs from "fs";
const { key, iv } = JSON.parse(fs.readFileSync('./encryption_key.json', 'utf8'));
const encryptedKeys = JSON.parse(fs.readFileSync('./bucket_keys.enc.json', 'utf8'));

const algorithm = 'aes-256-cbc';
const encryptionKey = Buffer.from(key, 'hex');
const ivBuffer = Buffer.from(iv, 'hex');

function decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(algorithm, encryptionKey, ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const AWS_ACCESS_KEY_ID = decrypt(encryptedKeys.encryptedAccess.encryptedData);
const AWS_SECRET_ACCESS_KEY = decrypt(encryptedKeys.encryptedSecret.encryptedData);


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
});

export default s3;