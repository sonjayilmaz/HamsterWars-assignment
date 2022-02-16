//importing npm packages
//configurating the server
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');



const PORT = process.env.PORT || 1337;
//const staticFolder = path.join(__dirname, 'static')

//middleware
//logger - writing info about incoming request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} `, req.params);
    next()
})

app.use(express.json())//for parsing application/json
app.use(cors());
//app.use(express.static({staticFolder}))

//routes

app.get('/', (req, res) =>{
    res.send('hamsterwars project')
})

    //rest api for /hamsters
    app.use('/hamsters', hamsters);
    app.use('/matches', matches);
    
    //starting the server
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
    