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

exports.createStaff = (req, res) => {
  reconnectToFirestore()
  const newStaff = req.body
  db.collection('staffs').add(newStaff)
    .then(() => res.status(200).send('Staff member created!'))
    .catch(err => res.status(500).send('Error creating task: ' + err.message))
}

