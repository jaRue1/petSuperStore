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

