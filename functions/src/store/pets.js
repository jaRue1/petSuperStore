
const admin = require("firebase-admin")

const serviceAccount = require("../../credentials.json")
let db;
function reconnectToFirestore() {
    if (!db) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
        db = admin.firestore()
    }
}
exports.deletePet = (req, res) => {
    reconnectToFirestore()
    const { petId } = req.params
    db.collection('pet').doc(petId).delete()
        .then(() => this.getPetId(req, res))
        .catch(err => res.status(500).send('error creating pet:' + err.message))
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
    .catch(err => res.status(500).send('Error getting pet' + err.message))
}

exports.createPet = (req, res) => {
  reconnectToFirestore()
  const newPet = req.body
  db.collection('pets').add(newPet)
    .then(() => res.status(200).send('Pet member created!'))
    .catch(err => res.status(500).send('Error creating pet' + err.message))
}
exports.updateSinglePet = (req, res) => {
  reconnectToFirestore()
  const { staffId } = req.params
  db.collection('staffs')
  .doc(staffId)
  .get()
  .then(singleStaff => res.send(singleStaff.data()))
}
