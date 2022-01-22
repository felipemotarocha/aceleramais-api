import Track from '../../entities/track.entity'
import MongooseHelper from '../../helpers/mongoose.helpers'
import _TrackModel from '../../models/track.model'

export interface TrackRepositoryAbstract {
  getAll(): Promise<Track[]>
}

class MongoTrackRepository implements TrackRepositoryAbstract {
  private readonly TrackModel: typeof _TrackModel

  constructor(TrackModel: typeof _TrackModel) {
    this.TrackModel = TrackModel
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.TrackModel.find({})

    return tracks.map((track) => MongooseHelper.map<Track>(track.toJSON()))
  }
}

export default MongoTrackRepository
