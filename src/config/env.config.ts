export const env = {
  mongodbUrl:
    process.env.MONGO_URL || 'mongodb://localhost:27017/sim-racer-api',
  port: process.env.PORT || 5050
}
