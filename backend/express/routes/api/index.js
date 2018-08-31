const express = require('express');
const router = express.Router();
const jsonData = require('./parking.json');

router.get('/getData', function(req, res, next) {
    res.json(jsonData);
});

console.log(jsonData.places[0].id);
module.exports = router;
