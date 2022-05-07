import { Seeder } from 'mongo-seeding'

import tracks from './data/tracks'
import bonifications from './data/bonifications'
import championships from './data/championships'
import driverStandings from './data/driverstandings'
import penalties from './data/penalties'
import raceClassifications from './data/raceclassifications'
import races from './data/races'
import scoringSystems from './data/scoringsystems'
import teams from './data/teams'
import teamStandings from './data/teamstandings'
import users from './data/users'

const main = async () => {
  try {
    const config = {
      database: process.env.MONGO_URL,

      dropDatabase: true
    }

    const seeder = new Seeder(config)

    await seeder.import([
      {
        name: 'tracks',
        documents: tracks
      },
      {
        name: 'bonifications',
        documents: bonifications
      },
      {
        name: 'championships',
        documents: championships
      },
      {
        name: 'driverstandings',
        documents: driverStandings
      },
      {
        name: 'penalties',
        documents: penalties
      },
      {
        name: 'raceclassifications',
        documents: raceClassifications
      },
      {
        name: 'races',
        documents: races
      },
      {
        name: 'scoringsystems',
        documents: scoringSystems
      },
      {
        name: 'teams',
        documents: teams
      },
      {
        name: 'teamstandings',
        documents: teamStandings
      },
      {
        name: 'users',
        documents: users
      }
    ])
  } catch (error) {
    console.error(error)
  }
}

main()
