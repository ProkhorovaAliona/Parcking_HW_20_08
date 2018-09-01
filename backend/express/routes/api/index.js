const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonData = require('./parking.json');
const fs = require('fs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/getData', function(req, res, next) {
    res.json(jsonData);
});
//console.log(jsonData.places[0].id);

router.use(bodyParser.json());
router.use(urlencodedParser);

router.post('/getData', 
function update(req, res) {
    console.log('updates: ', req.body);
    console.log('type: ',typeof req.body);
    fs.writeFile('parking.json', req.body, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.sendStatus(200);
    res.json(jsonData);
})

module.exports = router;
