'use strict'

const express = require('express')
const fs = require('fs')

const solvers = {
    '01': require('./src/dayOne'),
    '02': require('./src/dayTwo'),
    '03': require('./src/dayThree'),
    '04': require('./src/dayFour'),
    '05': require('./src/dayFive'),
}

const regEx = /\d{2}/

const app = express()

app.get('/:day', (req, res) => {
    if (!regEx.test(req.params.day)) return res.send('You must give a valid date.')
    if (solvers[req.params.day] == undefined) return res.send('No solution was found for that day.')
    const input = fs.readFileSync(`./input/day-${req.params.day}.txt`).toString()
    res.json(solvers[req.params.day](input))
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))