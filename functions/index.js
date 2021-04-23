
const functions = require("firebase-functions")
const express = require('express')
const { createPet, getAllPets, getSinglePet } = require('./src/store/pets')
const { createStaff, getAllStaff, getSingleStaff } = require('./src/store/staff')
const app = express()

app.get('/pets', getAllPets)
app.get('/staffs', getAllStaff) 
app.get('/staffs/:staffId', getSingleStaff)
app.get('/pets/:petId', getSinglePet)
app.post('/staff', createStaff)
app.post('/pets', createPet)
exports.app = functions.https.onRequest(app)

