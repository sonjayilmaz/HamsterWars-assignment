const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router()

//get /hamsters
router.get('/', async (req, res) =>{
    const hamstersRef = db.collection('hamsters')
    const snapshot = await hamstersRef.get()

    if( snapshot.empty ) {
        res.send([])
        return
    }
    let hamsters = []
    snapshot.forEach(doc => {
        const hamster = doc.data()
        hamster.id = doc.id
        hamsters.push( hamster )
    })
    res.send(hamsters)
})

//get /hamsters/:id
//post /hamsters
//put /hamsters/:id
//delete /hamsters/:id




module.exports = router