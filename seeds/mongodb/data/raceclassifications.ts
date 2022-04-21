import { ObjectID } from 'mongodb'

const raceClassification = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e46'),
    race: new ObjectID('6259bf61c5112dc1e32a1e45'),
    classification: [
      {
        position: 1,
        user: 'ohYViVrxyCakFXTrUdlS981v8Pf2',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        isRegistered: true,
        isRemoved: false
      },
      {
        position: 2,
        id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
        firstName: 'Carlos',
        lastName: 'Sainz',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        isRegistered: false,
        isRemoved: false
      },
      {
        position: 3,
        id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
        firstName: 'Max',
        lastName: 'Verstappen',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        isRegistered: false,
        isRemoved: false
      },
      {
        position: 4,
        id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
        firstName: 'Sérgio',
        lastName: 'Pérez',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        isRegistered: false,
        isRemoved: false
      }
    ]
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e4b'),
    race: new ObjectID('6259bf61c5112dc1e32a1e4a'),
    classification: []
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e50'),
    race: new ObjectID('6259bf61c5112dc1e32a1e4f'),
    classification: []
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e55'),
    race: new ObjectID('6259bf61c5112dc1e32a1e54'),
    classification: []
  }
]

export default raceClassification
