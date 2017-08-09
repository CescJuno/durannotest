var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    /*
    var b = req.query['b'];
    var c = req.query['c'];
    var v = req.query['v'];
    var k = req.query['k'];
    var chkLogin = req.session.logined;
    var mbrNum = req.session.mbrNum;
    var mbrEml = req.session.mbrEml;
    var mbrNam = req.session.mbrNam;
    */
    res.render('index', {
      title: '검색사이트'
    });
});

module.exports = router;
