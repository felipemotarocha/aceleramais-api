export const env = {
  mongodbUrl:
    process.env.MONGO_URL ||
    'mongodb://root:password@localhost:27017/sim-racer?authSource=admin',
  port: process.env.PORT || 5050,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  cloudFrontUrl: process.env.AWS_CLOUDFRONT_URL
}
