const {reconnectToFirestore} = require('./index')
exports.deleteStaff = (req, res) => {
    const db = reconnectToFirestore()
    const { staffId } = req.params
    db.collection('staffs').doc(staffId).delete()
    .then(()=> this.getAllStaff(req, res))
    .catch(err=> res.status(500).send('error creating staff:' + err.message)) 
}

exports.getAllStaff = (req, res) => {
    const db = reconnectToFirestore()
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
      const db = reconnectToFirestore()
      const { staffId } = req.params
      db.collection('staffs')
      .doc(staffId)
      .get()
      .then(singleStaff => res.send(singleStaff.data()))
  }
 
exports.createStaff = (req, res) => {
  const db = reconnectToFirestore()
  const newStaff = req.body
  db.collection('staffs').add(newStaff)
    .then(() => res.status(200).send('Staff member created!'))
    .catch(err => res.status(500).send('Error creating staff: ' + err.message))
}

exports.updateSingleStaff = (req, res) => {
  const db = reconnectToFirestore()
  const staffUpdate  = req.body
  db.collection('staffs').doc(req.params.staffId).update(staffUpdate)
  .then(() => this.getAllStaff(req,res))
  .catch(err => res.status(500).send('Error updating staff: ' + err.message))
}


