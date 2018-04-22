
const router = require('express').Router();
const userFunction = require('../modules/user');
const winston = require('winston');
const questionFunction = require('../modules/questions');
const { getVacancies, getVacancyById } = require('../modules/vacancies');
const { sendMessage } = require('../modules/telegram');

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
        );
    }
});

router.post('/telegram/message', async (req, res) => {
   try {
       const result = await sendMessage(req.body);
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
       );
   }
});

router.get('/vacancies/:id', async (req, res) => {
    try {
        const result = await getVacancyById(req.params.id);
        return res.send(result);
    } catch (err) {
        winston.log('error', err);
        return res.send(
            {
                meta: {
                    error: true
                },
                data: {}
            }
        );
    }
});

module.exports = router;