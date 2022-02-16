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

//get /matches/:id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const matchesRef = await db.collection('matches').doc(id).get()
    if( !matchesRef.exists ) {
        res.status(404).send('Match does not exist')
        return
    }
    const data = matchesRef.data()
    res.send(data)
})

//post /matches
router.post('/', async (req, res) => {
    const object = req.body;
    const docRef = await db.collection('matches').add(object);
    return res.status(200).send({ id: docRef.id });
});

//delete /matches/:id
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    if(!id){
        res.sendStatus(400)
        return
    }
    await db.collection('matches').doc(id).delete()
    res.sendStatus(200)
})

module.exports = router