import fs from 'fs'
import path from 'path'
import { mkdir } from 'fs/promises'
import { pipeline } from 'stream'
import fetch from 'node-fetch'

const baseUrl = 'http://localhost:1337'
const outputUrl = "./public/media-library"

async function downloadFile(url) {

    const res = await fetch(baseUrl + url)

    const outputPath = path.join(outputUrl, url);
    const outputDir = path.dirname(outputPath);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
        console.log('Directory created:', outputDir);
    }

    // Stream the response to the file
    const fileStream = fs.createWriteStream(outputPath);

    try {
        // Use pipeline to handle streaming and awaiting completion
        await new Promise((resolve, reject) => {
            pipeline(res.body, fileStream, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        console.log('File downloaded:', outputPath);
    } catch (err) {
        console.error('Download failed:', err);
        // Cleanup if download fails
        fileStream.close();
        fs.unlinkSync(outputPath);
    }
}

async function getFileList() {
    const fileListResponse = await fetch(baseUrl + '/api/upload/files')

    return await fileListResponse.json()
}

async function updateMediaLibrary() {
    const fileList = await getFileList()

    // now download each file and save to ./public/media-library/<url>
    for (let file of fileList) {
        if (file.formats) {
            // if image
            for (let format of Object.values(file.formats)) {
                downloadFile(format.url)
            }
        } else {
            // download file to url path
            downloadFile(file.url)
        }
    }
}

updateMediaLibrary()