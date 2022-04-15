const ChampionshipRepositoryHelpers = {
  handlePopulate(full: boolean) {
    if (full) {
      return [
        'driverStandings',
        'teamStandings',
        'races',
        'teams',
        'bonifications',
        'penalties',
        'nextRaces',
        'scoringSystem'
      ]
    }

    return [
      {
        path: 'driverStandings',
        select: 'standings',
        perDocumentLimit: 2
      },
      {
        path: 'teamStandings',
        select: 'standings'
      },
      {
        path: 'nextRaces',
        select: ['_id', 'track', 'startDate', '-championship']
      }
    ]
  }
}

export default ChampionshipRepositoryHelpers
