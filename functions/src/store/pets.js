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

exports.createPet = (req, res) => {
  reconnectToFirestore()
  const newPet = req.body
  db.collection('pets').add(newPet)
    .then(() => res.status(200).send('Pet member created!'))
    .catch(err => res.status(500).send('Error creating task: ' + err.message))
}



