const calculateOrbits = (input, centre, orbits=0) => {
    const objects = input.filter(x => x.split(')')[0] == centre)
    return objects.length == 0
        ? orbits
        : objects.reduce((a, b) => a + calculateOrbits(input, b.split(')')[1], orbits + 1), orbits)
}

const calculateTransfers = (input, origin, destination) => {
    const fromYou = getOrbitChain(input, origin)
    const fromDest = getOrbitChain(input, destination)
    const commonObject = fromYou.filter(x => fromDest.includes(x))[0]
    return fromYou.indexOf(commonObject) + fromDest.indexOf(commonObject) - 2
}

const findElement = (input, tag) => input.filter(x => x.split(')')[1] == tag)

const getOrbitChain = (input, element, chain=[]) => {
    const [ centre, object ] = element.split(')')
    const newChain = chain.concat(centre)
    if (centre == 'COM') return newChain
    const [ nextObject ] = findElement(input, centre)
    return getOrbitChain(input, nextObject, newChain)
}

module.exports = input => {
    const data = input.split('\n')
    const partOne = calculateOrbits(data, 'COM')
    const partTwo = calculateTransfers(data, 'YOU', 'SAN')
    return({ partOne, partTwo })
}