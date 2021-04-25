const {reconnectToFirestore} = require('./index')
exports.deletePet = (req, res) => {
    const db = reconnectToFirestore()
    const { petId } = req.params
    db.collection('pets').doc(petId).delete()
        .then(() => this.getAllPets(req, res))
        .catch(err => res.status(500).send('error creating pet:' + err.message))
}

exports.getAllPets = (req, res) => {
    const db = reconnectToFirestore()
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
    const db = reconnectToFirestore()
    const { petId } = req.params
    db.collection('pets')
    .doc(petId)
    .get()
    .then(singlePet => res.send(singlePet.data()))
    .catch(err => res.status(500).send('Error getting pet' + err.message))
}

exports.createPet = (req, res) => {
  const db = reconnectToFirestore()
  const newPet = req.body
  db.collection('pets').add(newPet)
    .then(() => res.status(200).send('Pet member created!'))
    .catch(err => res.status(500).send('Error creating pet' + err.message))
}
exports.updateSinglePet = (req, res) => {
  const db = reconnectToFirestore()
  const petUpdate  = req.body
  db.collection('pets').doc(req.params.petId).update(petUpdate)
  .then(() => this.getAllPets(req,res))
  .catch(err => res.status(500).send('Error updating staff: ' + err.message))
}
