const opcodes = {
    1: (intcode, posA, posB, posC) => intcode[posC] = intcode[posA] + intcode[posB],
    2: (intcode, posA, posB, posC) => intcode[posC] = intcode[posA] * intcode[posB],
}

const computeOpcode = (intcode, position=0) => {
    if (intcode[position] == 99) return intcode[0]
    const [ oc, a, b, dest ] = intcode.slice(position)
    opcodes[oc](intcode, a, b, dest)
    return computeOpcode(intcode, position + 4)
}

const findInput = (intcode, target) => {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const startingIC = initIC(intcode, i, j)
            const result = computeOpcode(startingIC)
            if (result == target) return i * 100 + j
        }
    }
}

const initIC = (intcode, noun, verb) => Object.assign([], intcode, { 1: noun, 2: verb })

module.exports = input => {
    const data = input.split(',').map(x => +x)
    intcodeOne = initIC(data, 12, 2)
    const partOne = computeOpcode(intcodeOne)
    const partTwo = findInput(data, 19690720)
    return({ partOne, partTwo })
}