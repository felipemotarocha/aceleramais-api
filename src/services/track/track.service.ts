import Track from '../../entities/track.entity'
import { TrackRepositoryAbstract } from '../../repositories/track/track.repository'

export interface TrackServiceAbstract {
  getAll(): Promise<Track[]>
}

class TrackService implements TrackServiceAbstract {
  private readonly trackRepository: TrackRepositoryAbstract

  constructor(trackRepository: TrackRepositoryAbstract) {
    this.trackRepository = trackRepository
  }

  async getAll(): Promise<Track[]> {
    return await this.trackRepository.getAll()
  }
}

export default TrackService
