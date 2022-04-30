const GeneralHelpers = {
  generateRandomNumberString: (length: number) => {
    return Math.random()
      .toString()
      .substring(2, length + 2)
  }
}

export default GeneralHelpers
