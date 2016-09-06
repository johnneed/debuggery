var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('leaks', { title: 'Death Defying Feats of Debuggery - Leaky Loop' });
});

module.exports = router;
