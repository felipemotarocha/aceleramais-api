import { validChampionship } from '.'
import ChampionshipServiceHelperSutFactory from '../../factories/suts/championship/championship.service-helper-sut.factory'

describe('Championship Service Helper', () => {
  const makeSut = ChampionshipServiceHelperSutFactory.make

  it('should prepare to update', async () => {
    const {
      sut,
      teamRepositoryStub,
      bonificationRepositoryStub,
      penaltyRepositoryStub,
      championshipRepositoryStub,
      scoringSystemRepositoryStub
    } = makeSut()

    const bulkDeleteTeamsSpy = jest.spyOn(teamRepositoryStub, 'bulkDelete')
    const bulkDeleteBonificationsSpy = jest.spyOn(
      bonificationRepositoryStub,
      'bulkDelete'
    )
    const bulkDeletePenaltiesSpy = jest.spyOn(
      penaltyRepositoryStub,
      'bulkDelete'
    )
    const deleteScoringSystemSpy = jest.spyOn(
      scoringSystemRepositoryStub,
      'delete'
    )
    const bulkUpdateChampionshipSpy = jest.spyOn(
      championshipRepositoryStub,
      'update'
    )

    await sut.prepareToUpdate({ championship: validChampionship })

    expect(bulkDeleteTeamsSpy).toHaveBeenCalledWith({
      ids: validChampionship.teams
    })
    expect(bulkDeleteBonificationsSpy).toHaveBeenCalledWith({
      ids: validChampionship.bonifications
    })
    expect(bulkDeletePenaltiesSpy).toHaveBeenCalledWith({
      ids: validChampionship.penalties
    })
    expect(deleteScoringSystemSpy).toHaveBeenCalledWith({
      id: validChampionship.scoringSystem
    })
    expect(bulkUpdateChampionshipSpy).toHaveBeenCalledWith({
      id: validChampionship.id,
      dto: {
        drivers: [],
        pendentDrivers: [],
        teams: [],
        penalties: [],
        bonifications: [],
        scoringSystem: validChampionship.scoringSystem
      }
    })
  })

  it('should update races', async () => {
    const { sut, raceRepositoryStub, raceClassificationRepositoryStub } =
      makeSut()

    const raceRepositoryBulkDeleteSpy = jest.spyOn(
      raceRepositoryStub,
      'bulkDelete'
    )
    const raceClassificationRepositoryBulkDeleteSpy = jest.spyOn(
      raceClassificationRepositoryStub,
      'bulkDelete'
    )
    const createRacesSpy = jest.spyOn(sut, 'createRaces' as any)

    await sut.updateRaces({
      championship: validChampionship.id,
      races: [
        {
          startDate: 'valid_start_date',
          track: 'valid_track',
          id: 'valid_race'
        },
        { startDate: 'valid_start_date', track: 'valid_track' }
      ]
    })

    expect(raceRepositoryBulkDeleteSpy).toHaveBeenCalledWith({
      ids: ['valid_id']
    })
    expect(raceClassificationRepositoryBulkDeleteSpy).toHaveBeenCalledWith({
      ids: ['valid_classification_id']
    })
    expect(createRacesSpy).toHaveBeenCalledWith({
      championship: validChampionship.id,
      races: [
        {
          id: 'valid_race',
          startDate: 'valid_start_date',
          track: 'valid_track'
        }
      ]
    })
  })
})
