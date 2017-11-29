const mongoRequests = require('../dbQueries/mongodb/queries');
const async = require('async');
const _ = require('lodash');

const questions = {

    /**
     * Get Questions From MongoDB
     * @param {Function} next
     */

    get: next => {
        mongoRequests.getQuestions((err, doc) => {
            if (err) {
                return next({
                    status: 'OK',
                    categories: [],
                    questions: []
                });
            }
            return next({
                status: 'OK',
                questions: doc,
            });
        });
    }

};

module.exports = questions;