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
});



//get /hamsters/:id
router.get('/:id', async(req, res) => {
    const id = req.params.id
    const hamstersRef = await db.collection('hamsters').doc(id).get()
    if( !hamstersRef.exists ) {
        res.status(404).send('Hamster does not exist')
        return
    }
    const data = hamstersRef.data()
    res.send(data)
})

//post /hamsters
router.post('/', async(req, res) => {
    const object = req.body

    if( !object.name || typeof object.age != 'number' || !object.favFood || !object.loves || !object.imgName || 
    typeof object.wins != 'number' || typeof object.defeats != 'number' || typeof object.games != 'number' ) {
        res.sendStatus(400) 
        return
    }
        const hamstersRef = await db.collection('hamsters').add(object)
        res.send(hamstersRef.id)
    })



//put /hamsters/:id
router.put('/:id', (req, res) => {
    const object = req.body

    if( !object.name || typeof object.age != 'number' || !object.favFood || !object.loves || !object.imgName || 
    typeof object.wins != 'number' || typeof object.defeats != 'number' || typeof object.games != 'number' ) {
        res.sendStatus(400) 
        return
    }
})




//delete /hamsters/:id




module.exports = router