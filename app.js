const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/meineme', {useNewUrlParser: true})
    .then(() => console.log('connected to db...'))
    .catch(err => console.log('failed to connect to db : ', err))

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/public'));

const routes = require('./routes');
app.use('/', routes);

// listen on port 3000
app.listen(port, () => {
    console.log('Server is listening on port ', port);
}); 