const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonData = require('./parking.json');

router.get('/getData', function(req, res, next) {
    res.json(jsonData);
});
console.log(jsonData.places[0].id);

router.use(bodyParser.json());

router.post('/getData', 
function update(req, res) {
    console.log('updates: ', req.body);
    res.sendStatus(200);
    res.json(jsonData);
})

module.exports = router;
