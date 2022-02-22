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


//get /hamsters/random
router.get('/random', async (req, res) => {
    const hamstersRef = db.collection('hamsters')
    const snapshot = await hamstersRef.get();

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
    }/* Ett objekt med id för det nya objekt som skapats i databasen: { id: "123..." }*/
        const hamstersRef = await db.collection('hamsters').add(object)
        const newId = hamstersRef.id
        const newObject = {id: newId}
        res.status(200).send(newObject)
    })



//put /hamsters/:id
router.put('/:id', async (req, res) => {
    const object = req.body
    const id = req.params.id

    const hamstersRef = db.collection('hamsters').doc(id)
    await hamstersRef.set(object, { merge: true })
    res.sendStatus(200)
})


//delete /hamsters/:id
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    if(!id){
        res.sendStatus(400)
        return
    }
    await db.collection('hamsters').doc(id).delete()
    res.sendStatus(200)
})




module.exports = router