import { Types } from 'mongoose'

import Track from '../../entities/track.entity'
import { TrackRepositoryAbstract } from '../../repositories/track/track.repository'
import TrackService, { TrackServiceAbstract } from './track.service'

describe('Track Service', () => {
  const validTrack = {
    id: new Types.ObjectId() as any,
    countryCode: 'BR',
    name: 'Autódromo José Carlos Pace',
    countryName: 'Brasil'
  }

  const makeSut = (): TrackServiceAbstract => {
    class TrackRepositoryStub implements TrackRepositoryAbstract {
      async getAll(): Promise<Track[]> {
        return [validTrack]
      }
    }

    return new TrackService(new TrackRepositoryStub())
  }

  it('should get all the Tracks', async () => {
    const sut = makeSut()

    const result = await sut.getAll()

    expect(result).toStrictEqual([validTrack])
  })
})
