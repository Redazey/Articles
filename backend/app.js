const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');

const PORT = 5000;

const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => console.log('server listening on port: ' + PORT))