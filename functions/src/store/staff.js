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