import TrackController from '../controllers/track/track.controller'
import TrackModel from '../models/track.model'
import MongoTrackRepository from '../repositories/track/track.repository'
import TrackService from '../services/track/track.service'

const makeTrackController = () => {
  const repository = new MongoTrackRepository(TrackModel)

  const service = new TrackService(repository)

  return new TrackController(service)
}

export default makeTrackController
