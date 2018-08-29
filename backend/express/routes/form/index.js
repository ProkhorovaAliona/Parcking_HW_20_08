const express = require('express');
const router = express.Router();
const Ajv = require('ajv');
const formSchema = require('./formSchema');

router.post('/', (req, res, next)=>{
    const ajv = new Ajv();
    const data = {
      "login": req.body.login, 
      "pwd": req.body.pwd
    }
const validate = ajv.compile(formSchema)
const valid = validate(data);
if (!valid) {
  console.warn(validate.errors);
} else {
  console.log('OK');
}
    next();
})

router.all('/', function(req, res, next) {
  res.render('form');
});

module.exports = router;
