const express = require('express');
const app = express();
const routes = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/purchases', routes);

module.exports = app;
