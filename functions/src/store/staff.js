
const admin = require("firebase-admin")
const serviceAccount = require("../../credentials.json")
let db;
function reconnectToFirestore() {
    if (!db) {
        admin.initializeApp({
            credential: admin.credential.cred(serviceAccount),
        })
        db = admin.firestore()
    }
}
exports.deleteStaff = (req, res) => {
    reconnetToFirestore()
    const { staffId } = req.params
    db.collection('staff').doc(staffId).delete()
    .then(()=> this.getstaffId(req, res))
    .catch(err=> res.status(500).send('error creating staff:' + err.message)) 
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


