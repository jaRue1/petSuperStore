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

exports.getAllStaff = (req, res) => {
    reconnectToFirestore()
    db.collection('staffs')
      .get()
      .then((allStaff) => {
        let staffs = []
        allStaff.forEach((staff) => {
            staffs.push(staff.data())
          })
        res.send(staffs)
      })
      .catch((err) => res.status(500).send('Error getting all staff: ' + err.message))
  }
 
  exports.getSingleStaff = (req, res) => {
      reconnectToFirestore()
      const { staffId } = req.params
      db.collection('staffs')
      .doc(staffId)
      .get()
      .then(singleStaff => res.send(singleStaff.data()))
  }
 
exports.createStaff = (req, res) => {
  reconnectToFirestore()
  const newStaff = req.body
  db.collection('staffs').add(newStaff)
    .then(() => res.status(200).send('Staff member created!'))
    .catch(err => res.status(500).send('Error creating task: ' + err.message))
}

exports.updateStaff = (req, res) => {
  reconnectToFirestore()
  res.send("")
}
exports.deleteStaff= (req, res) => {
  reconnectToFirestore()
  res.send("")
}

