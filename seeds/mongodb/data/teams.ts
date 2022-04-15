import { ObjectID } from 'mongodb'

const teams = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e35'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    name: 'Ferrari',
    color: '#F60000'
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e36'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    name: 'Red Bull',
    color: '#002776'
  }
]

export default teams
