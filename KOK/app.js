var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var route = require('./routes/route');
mongoose.connect('mongodb://localhost:27017/contactlist');
mongoose.connection.on('connected', (err) => {
    if (err) {
        console.log('Error in Database connection: ' + err);
    } else
        console.log('Connected to database mongodb @ 27017');
});
const port = 3000;
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', route);
app.get('/', (req, res) => {
    res.send('KOK');
});
app.listen(port, () => {
    console.log('Server is runnig at port: ' + port);
})