let admin = require("firebase-admin")
let serviceAccount = require("../../credentials.json")
exports.reconnectToFirestore = () => {
  if(admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
  return admin.firestore()
}


