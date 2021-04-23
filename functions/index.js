const functions = require("firebase-functions")
const { createStaff } = require('./src/store/staff')
const { createPet } = require('./src/store/pets')
const express = require('express')
const app = express()
exports.app = functions.https.onRequest(app)


app.post('/staff', createStaff)
app.post('/pets', createPet)