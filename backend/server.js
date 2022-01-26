//importing npm packages
//configurating the server
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');

const getDatabase = require('./database.js');
const db = getDatabase();

const PORT = process.env.PORT || 1337;

//middleware
app.use(express.json())//for parsing application/json
app.use(cors());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Yes I am working')
    });

    //routes
    //app.use('/hamsters', hamsters);
    
    //starting the server
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
    