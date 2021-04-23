const functions = require("firebase-functions")
const express = require('express');
const { deleteStaff } = require("./src/store/staff");
const { deletePet } = require("./src/store/pets");
const app = express()
exports.app = functions.https.onRequest(app)

app.delete('/staff/:staffId', deleteStaff)
app.delete('/pets/:petId', deletePet)