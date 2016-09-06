var express = require('express');
var router = express.Router();

/* GET factorial app. */
router.get('/', function(req, res, next) {
    res.render('catfabulous', { title: 'Death Defying Feats of Debuggery - Catfabulous' });
});

module.exports = router;
