import { ObjectID } from 'mongodb'

const driverStandings = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e3b'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    standings: [
      {
        user: '6UrOYyinh9TJg9M6n1t5mSJzQPu2',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        position: 1,
        points: 25,
        isRegistered: true,
        isRemoved: false
      },
      {
        id: '2af8fe01-474f-4069-a6f9-bcc980f0333a',
        firstName: 'Carlos',
        lastName: 'Sainz',
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        position: 2,
        points: 20,
        isRegistered: false,
        isRemoved: false
      },
      {
        id: 'a1b55300-c576-42c7-b824-c9656a52b7e1',
        firstName: 'Max',
        lastName: 'Verstappen',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        position: 3,
        points: 18,
        isRegistered: false,
        isRemoved: false
      },
      {
        id: 'b9638ff6-b201-4a19-bd8d-b333e4dd3f41',
        firstName: 'Sérgio',
        lastName: 'Pérez',
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        position: 4,
        points: 15,
        isRegistered: false,
        isRemoved: false
      }
    ]
  }
]

export default driverStandings
