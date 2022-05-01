import { ObjectID } from 'mongodb'

const championships = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e34'),
    code: '12345678',
    name: 'PSGL Sim Racing League',
    avatarImageUrl:
      'https://sim-racer-app.s3.sa-east-1.amazonaws.com/championship-images/6259bf61c5112dc1e32a1e34.jpeg',
    description: 'Join us and start racing now!',
    platform: 'PC',
    races: [
      new ObjectID('6259bf61c5112dc1e32a1e45'),
      new ObjectID('6259bf61c5112dc1e32a1e4a'),
      new ObjectID('6259bf61c5112dc1e32a1e4f'),
      new ObjectID('6259bf61c5112dc1e32a1e54')
    ],
    admins: [
      {
        user: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
        isCreator: true
      }
    ],
    pendentDrivers: [],
    drivers: [
      {
        user: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        isRegistered: true,
        isRemoved: false,
        bonifications: [],
        penalties: []
      },
      {
        id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
        firstName: 'Carlos',
        lastName: 'Sainz',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: []
      },
      {
        id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
        firstName: 'Max',
        lastName: 'Verstappen',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: []
      },
      {
        id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
        firstName: 'Sérgio',
        lastName: 'Pérez',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        isRegistered: false,
        isRemoved: false,
        bonifications: [],
        penalties: []
      }
    ],
    teams: [
      new ObjectID('6259bf61c5112dc1e32a1e35'),
      new ObjectID('6259bf61c5112dc1e32a1e36')
    ],
    driverStandings: new ObjectID('6259bf61c5112dc1e32a1e3b'),
    teamStandings: new ObjectID('6259bf61c5112dc1e32a1e3d'),
    scoringSystem: new ObjectID('6259bf61c5112dc1e32a1e3f'),
    bonifications: [new ObjectID('6259bf61c5112dc1e32a1e41')],
    penalties: [new ObjectID('6259bf61c5112dc1e32a1e43')]
  }
]

export default championships
