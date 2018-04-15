
const router = require('express').Router();
const userFunction = require('../modules/user');
const winston = require('winston');
const questionFunction = require('../modules/questions');
const {getVacancies} = require('../modules/vacancies');

router.get('/userInfo', (req, res, next) => {
    userFunction.getInfo(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    });
});

router.get('/vacancies', async (req, res) => {
    try {
        const result = await getVacancies(req.query);
        return res.send(result);
    } catch (err) {
        winston.log('error', err);
        return res.send(
            {
                meta: {
                    error: true
                },
                data: []
            }
        )
    }
});

module.exports = router;