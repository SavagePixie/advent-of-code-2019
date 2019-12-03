const directions = {
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
}

const getCoordinates = (accum, input) => {
    const letter = input.slice(0, 1)
    const number = input.slice(1)
    const prev = accum[accum.length - 1] || { x: 0, y: 0 }

    const newItems = Array.from({ length: number }, (_, i) => ({
        x: prev.x + directions[letter].x * (i + 1),
        y: prev.y + directions[letter].y * (i + 1),
    }))

    return accum.concat(newItems)
}

const getIntersections = cables => {
    const [ sA, sB ] = stringifyCables(cables)
    const setB = new Set(sB)

    return sA.filter(x => setB.has(x))
}

const getClosestIntersection = cables => {
    const intersections = getIntersections(cables).map(JSON.parse)
    return intersections.reduce((a, b) => {
        const distance = Math.abs(b.x) + Math.abs(b.y)
        return distance < a ? distance : a
    }, Infinity)
}

const getFewestSteps = cables => {
    const [ cA, cB ] = stringifyCables(cables)
    const intersections = getIntersections(cables)
    return Math.min(...intersections.map(x => cA.indexOf(x) + cB.indexOf(x) + 2))
}

const stringifyCables = ([ a, b ]) => [ a.map(JSON.stringify), b.map(JSON.stringify) ]

module.exports = input => {
    const data = input.split('\n').slice(0, -1).map(x => x.split(','))
    const cables = data.map(x => x.reduce(getCoordinates, []))
    const partOne = getClosestIntersection(cables)
    const partTwo = getFewestSteps(cables)
    return({ partOne, partTwo })
}
