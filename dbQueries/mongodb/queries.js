
/**
 * Module Dependencies
 */

const mongoose = require('mongoose');
const config = require('../../config');
const winston = require('winston');
const text = require('../../texts');
const async = require('async');
const _ = require('lodash');
const tokenFunction = require('../../modules/token');
const {
    UsersModel
} = require('./models');

mongoose.Promise = Promise;


/**
 * MongoDB Default Connection
 */

const connectMongo = () => {
    mongoose.connect(config.mongoConf.url, config.mongoConf.options);
};

connectMongo();

mongoose.connection.on('connected', () => {
    winston.log('info', text.mongoConnection);
});
mongoose.connection.on('error', err => {
    winston.log('error', err);
    setTimeout(connectMongo, 5000);
});

const mongo = {

    /**
     * Register
     * @param {Object} data
     * @param {Function} next
     */

    register: (data, next) => {
        const Data = data;
        async.waterfall([

            callback => {
                UsersModel.find({ email: data.email }, null, { lean: true })
                    .then(doc => callback(null, doc),
                        err => callback(err));
            },

            (doc, callback) => {
                if (!_.isEmpty(doc)) {
                    return callback({
                        error: true, message: text.usernameExists, status: 200
                    });
                }
                Data.token = tokenFunction.generate(Data);
                callback(null);
            },

            callback => {
                UsersModel.create(data, err => err ? callback(err) : callback(err, Data));
            }

        ], (err, result) => err ? next(err) : next(null, result));
    },

    /**
     * Login
     * @param {Object} data
     * @param {Function} next
     */


    login: (data, next) => {
        async.waterfall([

            callback => {
                UsersModel.findOne({ email: data.email }, null, { lean: true })
                    .then(doc => callback(null, doc),
                        err => callback(err));
            },

            (doc, callback) => {
                if (!_.isEmpty(doc)) return callback(null, doc);
                callback({ error: true, message: text.dataIncorrect, status: 200 });
            },

            (doc, callback) => {
                if (data.password === doc.password) {
                    return callback(null, doc);
                }
                callback({ error: true, message: text.dataIncorrect, status: 200 });
            }

        ], (err, result) => err ? next(err) : next(null, result));
    },

    /**
     * Find Token
     * @param {String} token
     * @param {Function} next
     */

    checkToken: (token, next) => {
        UsersModel.findOne({ token }, null, { lean: true })
            .then(doc => {
                if (!_.isEmpty(doc)) return next(null, doc);
                return next({ message: 'Token is not valid' });
            }, err => next(err));
    },

    /**
     * Get Data By Token
     * @param {String} token
     * @param {Function} next
     */

    getUserInfo: (token, next) => {
        UsersModel.findOne({ token }, null, { lean: true })
            .then(doc => {
                if (!_.isEmpty(doc)) return next(null, doc);
                return next({
                    message: text.userNotFound, status: 200
                });
            }, err => next(err));
    },

};

module.exports = mongo;