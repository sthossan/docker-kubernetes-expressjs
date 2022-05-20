var express = require('express');
const dbservice = require('../services/db_service')

var router = express.Router();

/* GET db listing. */
router.get('/', async function (req, res, next) {
    res.send(await dbservice.checkDbConnectivitty());
});

module.exports = router;