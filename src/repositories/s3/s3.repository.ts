import { Express } from 'express'
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import { env } from '../../config/env.config'

export interface S3RepositoryAbstract {
  uploadImage({
    folderName,
    fileName,
    file
  }: {
    folderName: string
    fileName: string
    file: Express.Multer.File
  }): Promise<string>
}

export class S3Repository implements S3RepositoryAbstract {
  async uploadImage({
    folderName,
    fileName,
    file
  }: {
    folderName: string
    fileName: string
    file: Express.Multer.File
  }): Promise<string> {
    const s3Client = new S3Client({ region: 'us-east-1' })

    const extension = file.mimetype.split('/')[1]
    const key = `${folderName}/${fileName}.${extension}`

    const command: PutObjectCommandInput = {
      Bucket: env.awsBucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }

    await s3Client.send(new PutObjectCommand(command))

    return `https://${env.cloudFrontUrl}/${key}`
  }
}
