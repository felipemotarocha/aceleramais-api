import 'dotenv/config'

import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import { env } from './config/env.config'
import MongooseHelper from './helpers/mongoose.helpers'

MongooseHelper.connect(env.mongodbUrl)
  .then(async () => {
    const app = (await import('./config/app.config')).default

    Sentry.init({
      dsn: env.sentryDns,
      normalizeDepth: 11,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app })
      ],
      tracesSampleRate: 1.0
    })

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    )
  })
  .catch(console.error)
