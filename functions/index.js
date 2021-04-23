const functions = require("firebase-functions");
const express = require('express')
const { getAllPets, getSinglePet } = require('./src/store/pets')
const { getAllStaff, getSingleStaff } = require('./src/store/staff')
const app = express()
exports.app = functions.https.onRequest(app)

app.get('/pets', getAllPets)
app.get('/staffs', getAllStaff) 
app.get('/staffs/:staffId', getSingleStaff)
app.get('/pets/:petId', getSinglePet)