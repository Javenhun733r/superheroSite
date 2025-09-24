require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const  fs = require("fs");
console.log("Key:", process.env.AWS_ACCESS_KEY);
console.log("Secret:", process.env.AWS_SECRET_ACCESS_KEY ? "✅ Loaded" : "❌ Missing");

const s3 = new S3Client({
    region: "eu-north-1", // заміни на свій регіон
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Завантаження файлу
async function uploadFile() {
    const fileContent = fs.readFileSync("./test.jpg");

    const uploadParams = {
        Bucket: "superhero-upload",
        Key: "images/test.jpg", // шлях у бакеті
        Body: fileContent,
        ContentType: "image/jpg"
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await s3.send(command);
    console.log("✅ File uploaded:", response);
}

// Завантаження файлу з бакета
async function downloadFile() {
    const command = new GetObjectCommand({
        Bucket: "superhero-upload",
        Key: "images/test.jpg"
    });

    const response = await s3.send(command);
    response.Body.pipe(fs.createWriteStream("./downloaded.jpg"));
    console.log("✅ File downloaded");
}

uploadFile();
