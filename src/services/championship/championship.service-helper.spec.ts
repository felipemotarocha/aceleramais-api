import { ChampionshipServiceSutFactory, validChampionship } from '.'

describe('Championship Service Helper', () => {
  const makeSut = ChampionshipServiceSutFactory.make

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

    await sut.prepareToUpdate(validChampionship)

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
})
