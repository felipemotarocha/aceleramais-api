import 'dotenv/config'

import { env } from './config/env.config'
import MongooseHelper from './helpers/mongoose.helpers'

MongooseHelper.connect(env.mongodbUrl)
  .then(async () => {
    const app = (await import('./config/app.config')).default

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    )
  })
  .catch(console.error)
