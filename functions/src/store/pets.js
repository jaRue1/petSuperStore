var admin = require("firebase-admin")

let serviceAccount = require("../../credentials.json")
let db;
function reconnectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}

exports.getAllPets = (req, res) => {
    reconnectToFirestore()
    db.collection('pets')
      .get()
      .then((allPets) => {
        let pets = []
        allPets.forEach((pet) => {
          pets.push(pet.data())
        })
        res.send(pets)
      })
      .catch((err) => res.status(500).send('Error getting all pets: ' + err.message))
  }

  exports.getSinglePet = (req, res) => {
    reconnectToFirestore()
    const { petId } = req.params
    db.collection('pets')
    .doc(petId)
    .get()
    .then(singlePet => res.send(singlePet.data()))
}