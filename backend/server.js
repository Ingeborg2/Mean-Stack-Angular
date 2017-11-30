const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const config = require('./config/db');
const path = require('path');
const authentication = require('./routes/authentication.js')(router);
const gems = require('./routes/gems.js')(router);
const cors = require('cors');


mongoose.connect(config.uri, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err)
    } else {
        //console.log(config.secret);
        console.log('Connected to database: ' + config.db)
    }
});

//Middleware for CORS - ONLY for development environment - once you go in production, everything will be running in one domain
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + './../client/dist'));
app.use('/authentication', authentication);
app.use('/gems', gems);

// path description from server (backend) to index.html file in angular app (frontend)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './../client/dist/index.html'));
});

app.listen(3000, () => console.log('Listening on port 3000'));