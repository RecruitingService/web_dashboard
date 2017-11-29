
const router = require('express').Router();
const userFunction = require('../modules/user');
const questionFunction = require('../modules/questions');

router.get('/userInfo', (req, res, next) => {
    userFunction.getInfo(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    });
});

router.get('/questions', (req, res) => {
    questionFunction.get(result => res.send(result));
});

module.exports = router;