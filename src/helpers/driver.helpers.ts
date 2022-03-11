import { ChampionshipDriver } from '../entities/championship.entity'

const DriverHelpers = {
  verifyIfAreInvalid: (drivers: ChampionshipDriver[]) => {
    return drivers.some(
      (item) =>
        (!item.user && item.isRegistered) ||
        (item.user && (item.firstName || item.lastName || item.id)) ||
        (item.user && !item.isRegistered) ||
        (!item.isRegistered && !item.id) ||
        ((item.firstName || item.lastName || item.id) && item.isRegistered) ||
        item.isRegistered === undefined ||
        item.isRegistered === null
    )
  }
}

export default DriverHelpers
