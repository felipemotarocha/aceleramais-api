import { Types } from 'mongoose'

import Track from '../../entities/track.entity'
import { TrackServiceAbstract } from '../../services/track/track.service'
import TrackController, { TrackControllerAbstract } from './track.controller'

describe('Track Controller', () => {
  const validTrack = {
    id: new Types.ObjectId() as any,
    countryCode: 'BR',
    name: 'Autódromo José Carlos Pace'
  }

  const makeSut = (): TrackControllerAbstract => {
    class TrackServiceStub implements TrackServiceAbstract {
      async getAll(): Promise<Track[]> {
        return [validTrack]
      }
    }

    return new TrackController(new TrackServiceStub())
  }

  it('should get all the Tracks', async () => {
    const sut = makeSut()

    const result = await sut.getAll({})

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validTrack])
  })
})
