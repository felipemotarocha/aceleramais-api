import { Seeder } from 'mongo-seeding'

import tracks from './data/tracks'

const main = async () => {
  try {
    const config = {
      database:
        'mongodb://root:password@localhost:27017/sim-racer?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',

      dropDatabase: true
    }

    const seeder = new Seeder(config)

    await seeder.import([
      {
        name: 'tracks',
        documents: tracks
      }
    ])
  } catch (error) {
    console.error(error)
  }
}

main()
