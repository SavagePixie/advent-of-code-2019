const fuelReducer = (a, b) => a + Math.floor(b / 3) - 2

const fuelReducerTwo = (a, b) => {
    const fuel = Math.floor(b / 3) - 2
    return fuel <= 0 ? a : fuelReducerTwo(a + fuel, fuel)
}

module.exports = input => {
    const data = input.split('\n').slice(0, -1)
    const partOne = data.reduce(fuelReducer, 0)
    const partTwo = data.reduce(fuelReducerTwo, 0)
    return({ partOne, partTwo })
}
