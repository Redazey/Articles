const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
    
app.use("/", router);

app.listen(PORT, () => console.log('server listening on port: ' + PORT))