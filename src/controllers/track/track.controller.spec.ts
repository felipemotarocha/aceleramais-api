import { Types } from 'mongoose'

import Track from '../../entities/track.entity'
import { ServerError } from '../../errors/controllers.errors'
import { TrackServiceAbstract } from '../../services/track/track.service'
import TrackController, { TrackControllerAbstract } from './track.controller'

describe('Track Controller', () => {
  const validTrack = {
    id: new Types.ObjectId() as any,
    countryCode: 'BR',
    name: 'Autódromo José Carlos Pace'
  }

  interface SutTypes {
    sut: TrackControllerAbstract
    trackServiceStub: TrackServiceAbstract
  }

  const makeSut = (): SutTypes => {
    class TrackServiceStub implements TrackServiceAbstract {
      async getAll(): Promise<Track[]> {
        return [validTrack]
      }
    }

    const trackServiceStub = new TrackServiceStub()
    const sut = new TrackController(trackServiceStub)

    return { sut, trackServiceStub }
  }

  it('should get all the Tracks', async () => {
    const { sut } = makeSut()

    const result = await sut.getAll({})

    expect(result.statusCode).toBe(200)
    expect(result.body).toStrictEqual([validTrack])
  })

  it('should return 400 if ProductService throws', async () => {
    const { sut, trackServiceStub } = makeSut()

    jest
      .spyOn(trackServiceStub, 'getAll')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error()))
      )

    const result = await sut.getAll({})

    expect(result.statusCode).toBe(400)
    expect(result.body).toStrictEqual(new ServerError())
  })
})
