var express = require('express');
var router = express.Router();

/* GET factorial app. */
router.get('/', function(req, res, next) {
    res.render('factorial', { title: 'Death Defying Feats of Debuggery - Factorial' });
});

module.exports = router;
