const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router()

//get /matches
router.get('/', async (req, res) =>{
    const matchesRef = db.collection('matches')
    const snapshot = await matchesRef.get()

    if( snapshot.empty ) {
        res.send([])
        return
    }
    let matches = []
    snapshot.forEach(doc => {
        const match = doc.data()
        match.id = doc.id
        matches.push( match )
    })
    res.send(matches)
});

module.exports = router