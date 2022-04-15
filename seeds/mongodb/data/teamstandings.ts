import { ObjectID } from 'mongodb'

const teamStandings = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e3d'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    standings: [
      {
        team: new ObjectID('6259bf61c5112dc1e32a1e35'),
        position: 1,
        points: 45
      },
      {
        team: new ObjectID('6259bf61c5112dc1e32a1e36'),
        position: 2,
        points: 33
      }
    ]
  }
]

export default teamStandings
