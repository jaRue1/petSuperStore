var admin = require("firebase-admin")

let serviceAccount = require("../../credentials.json")
let db;

function reconnectToFirestore() {
  if(!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}


