const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router()

//get /hamsters
router.get('/', async (req, res) =>{
    const hamsterRef = db.collection('hamsters')
    const snapshot = await hamsterRef.get()

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


//get /hamsters/random
router.get('/random', async (req, res) => {
    const hamsterRef = db.collection('hamsters')
    const snapshot = await hamsterRef.get();

    if( snapshot.empty){
        res.status(404).send('Could not find any hamsters')
        return
    }
    let hamsters = []

    snapshot.forEach(doc => {
        const hamster = doc.data()
        hamster.id = doc.id
        hamsters.push(hamster)
    })
    const randomHamster = Math.floor(Math.random() * hamsters.length)
    res.status(200).send(hamsters[randomHamster])
})




//get /hamsters/:id
router.get('/:id', async(req, res) => {
    const id = req.params.id
    const hamsterRef = await db.collection('hamsters').doc(id).get()
    if( !hamsterRef.exists ) {
        res.status(404).send('Hamster does not exist')
        return
    }
    const data = hamsterRef.data()
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
        const hamsterRef = await db.collection('hamsters').add(object)
        const newId = hamsterRef.id
        const newObject = {id: newId}
        res.status(200).send(newObject)
    })



//put /hamsters/:id
router.put('/:id', async (req, res) => {
    const object = req.body
    const id = req.params.id

    const hamsterRef = db.collection('hamsters').doc(id)
    const hamsterDoc = await hamsterRef.get();
    if(!hamsterDoc.exists){
    res.sendStatus(404)
    return
    }
    else if(Object.keys(object).length === 0) {
       res.sendStatus(400)
       return 
    }
    await hamsterRef.set(object, { merge: true })
    res.sendStatus(200)
})


//delete /hamsters/:id
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const hamsterRef = db.collection('hamsters').doc(id)
    const hamsterDoc = await hamsterRef.get();

    if(!id){
        res.sendStatus(400)
        return
    }
    else if(!hamsterDoc.exists){
        res.sendStatus(404)
        return
    }
    await db.collection('hamsters').doc(id).delete()
    res.sendStatus(200)
})




module.exports = router