import { ChampionshipDriver } from '../entities/championship.entity'

const DriverHelpers = {
  verifyIfAreInvalid: (drivers: ChampionshipDriver[]) => {
    return drivers.some(
      (item) =>
        (!item.user && item.isRegistered) ||
        (item.user && (item.firstName || item.lastName)) ||
        (item.user && !item.isRegistered) ||
        ((item.firstName || item.lastName) && item.isRegistered) ||
        item.isRegistered === undefined ||
        item.isRegistered === null
    )
  }
}

export default DriverHelpers
