import { ChampionshipDriver } from '../entities/championship.entity'

const DriverHelpers = {
  verifyIfAreInvalid: (drivers: ChampionshipDriver[]) => {
    return drivers.some(
      (item) =>
        (!item.user && item.isRegistered) ||
        (item.user && item.userName) ||
        (item.user && !item.isRegistered) ||
        (item.userName && item.isRegistered) ||
        item.isRegistered === undefined ||
        item.isRegistered === null
    )
  }
}

export default DriverHelpers
