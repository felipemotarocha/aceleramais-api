import { ObjectID } from 'mongodb'

const races = [
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e45'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    track: new ObjectID('624ef8a7a48d056271814be9'),
    startDate: '2022-04-15T18:52:12.912Z',
    isCompleted: true,
    classification: new ObjectID('6259bf61c5112dc1e32a1e46')
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e4a'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    track: new ObjectID('624ef8a7a48d056271814bea'),
    startDate: '2022-04-19T18:52:12.000Z',
    isCompleted: false,
    classification: new ObjectID('6259bf61c5112dc1e32a1e4b')
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e4f'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    track: new ObjectID('624ef8a7a48d056271814beb'),
    startDate: '2022-04-28T18:52:12.000Z',
    isCompleted: false,
    classification: new ObjectID('6259bf61c5112dc1e32a1e50')
  },
  {
    _id: new ObjectID('6259bf61c5112dc1e32a1e54'),
    championship: new ObjectID('6259bf61c5112dc1e32a1e34'),
    track: new ObjectID('624ef8a7a48d056271814bfc'),
    startDate: '2022-05-06T18:52:12.000Z',
    isCompleted: false,
    classification: new ObjectID('6259bf61c5112dc1e32a1e55')
  }
]

export default races
