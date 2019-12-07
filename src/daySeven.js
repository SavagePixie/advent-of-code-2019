const opcodes = {
    1: {
            func: (intcode, posA, posB, posC, modA=0, modB=0) =>
                intcode[posC] = applyMode(intcode, posA, modA) + applyMode(intcode, posB, modB),
            next: 4,
        },
    2: {
            func: (intcode, posA, posB, posC, modA=0, modB=0) =>
                intcode[posC] = applyMode(intcode, posA, modA) * applyMode(intcode, posB, modB),
            next: 4,
        },
    3: {
            func: (intcode, pos, input) => intcode[pos] = input,
            next: 2,
        },
    4: {
            func: (intcode, pos, _, __, mod=0) => applyMode(intcode, pos, mod),
            next: 2,
        },
    5: {
            func: (intcode, posA, posB, _, modA=0, modB=0, position) =>
                opcodes[5].next = applyMode(intcode, posA, modA) != 0 ? applyMode(intcode, posB, modB) - position : 3,
            next: 3
    },
    6: {
            func: (intcode, posA, posB, _, modA=0, modB=0, position) =>
                opcodes[6].next = applyMode(intcode, posA, modA) == 0 ? applyMode(intcode, posB, modB) - position : 3,
            next: 3,
        },
    7: {
            func: (intcode, posA, posB, posC, modA=0, modB=0) =>
                intcode[posC] = applyMode(intcode, posA, modA) < applyMode(intcode, posB, modB) ? 1 : 0,
            next: 4,
    },
    8: {
            func: (intcode, posA, posB, posC, modA=0, modB=0) =>
                intcode[posC] = applyMode(intcode, posA, modA) == applyMode(intcode, posB, modB) ? 1 : 0,
            next: 4,
    },
}

const applyMode = (intcode, pos, mode) => mode == 0 ? intcode[pos] : pos

const computeOpcode = (intcode, input, position=0, diagnosticCode) => {
    if (intcode[position] == 99) return diagnosticCode
    const [ oc, _, m1, m2, m3 ] = intcode[position].toString().split('').reverse().map(x => +x)
    const [ a, b, dest ] = intcode.slice(position + 1)
    const bInput = oc != 3
        ? b
        : intcode.indexOf(3) == position
        ? input[0]
        : input[1]
    diagnosticCode = opcodes[oc].func(intcode, a, bInput, dest, m1, m2, position)
    if (oc == 4) console.log(diagnosticCode)
    return computeOpcode(intcode, input, position + opcodes[oc].next, diagnosticCode)
}

const findCombinations = input => input.length == 1
    ? input
    : input
        .map((x, i, a) => 
            findCombinations(a.filter(y => y != x))
                .map(z => x + z)
        )
        .flat()

const tryCombinations = (input, data) => findCombinations(input)
    .map(x =>
        x.split('')
            .reduce((a, b) => computeOpcode([ ...data ], [ +b, a ]), 0)
    )
    .reduce((a, b) => b > a ? b : a, -Infinity)     

module.exports = input => {
    const data = input.split(',').map(x => +x)
    const sequence = '01234'.split('')

    const partOne = tryCombinations(sequence, data)

    return({ partOne })
}
