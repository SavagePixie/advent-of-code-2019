const checkAdjacent = number => number.toString().split('').some((x, i, a) => x == a[i - 1])

const checkAdjacentTwo = number => number
    .toString()
    .split('')
    .some((x, i, a) => x == a[i - 1] && x != a[i - 2] && x != a[i + 1])

const checkNoDecrease = number => number.toString().split('').every((x, i, a) => {
    const prev = a[i - 1] || 0
    return x >= prev
})

const findCombinations = (from, to, adjChecker) => Array
    .from({ length: to - from + 1 }, (_, i) => from + i)
    .filter(x => adjChecker(x) && checkNoDecrease(x)).length

module.exports = input => {
    const [ from, to ] = input.split('-')
    const partOne = findCombinations(+from, +to, checkAdjacent)
    const partTwo = findCombinations(+from, +to, checkAdjacentTwo)
    return({ partOne, partTwo })
}