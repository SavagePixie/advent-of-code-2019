'use strict'

const express = require('express')
const fs = require('fs')

const solvers = {
    '01': require('./src/dayOne'),
    '02': require('./src/dayTwo'),
}

const regEx = /\d{2}/

const app = express()

app.get('/:day', (req, res) => {
    if (!regEx.test(req.params.day)) res.send('You must give a valid date.')
    const input = fs.readFileSync(`./input/day-${req.params.day}.txt`).toString()
    res.json(solvers[req.params.day](input))
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))