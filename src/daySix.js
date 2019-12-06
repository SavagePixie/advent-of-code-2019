const findElement = (input, tag) => input.filter(x => x.split(')')[1] == tag)

const getOrbits = (input, element, orbits=1) => {
    if (!getOrbits.checkedOrbits) getOrbits.checkedOrbits = {}

    const [ centre, object ] = element.split(')')
    if (centre == 'COM') {
        getOrbits.checkedOrbits[object] = 1
        return orbits
    }
    if (getOrbits.checkedOrbits.hasOwnProperty(centre)) {
        getOrbits.checkedOrbits[object] = getOrbits.checkedOrbits[centre] + 1
        return orbits + getOrbits.checkedOrbits[centre]
    }
    const [ nextObject ] = findElement(input, centre)
    return getOrbits(input, nextObject, orbits + 1)
}

const getOrbitChain = (input, element, chain=[]) => {
    const [ centre, object ] = element.split(')')
    const newChain = chain.concat(centre)
    if (centre == 'COM') return newChain
    const [ nextObject ] = findElement(input, centre)
    return getOrbitChain(input, nextObject, newChain)
}

const calculateTransfers = (input, origin, destination) => {
    const fromYou = getOrbitChain(input, origin)
    const fromDest = getOrbitChain(input, destination)
    const commonObject = fromYou.filter(x => fromDest.includes(x))[0]
    return fromYou.indexOf(commonObject) + fromDest.indexOf(commonObject) - 2
}

module.exports = input => {
    const data = input.split('\n')
    const partOne = data.reduce((a, b) => a + getOrbits(data, b), 0)
    const partTwo = calculateTransfers(data, 'YOU', 'SAN')
    return({ partOne, partTwo })
}