const mongoRequests = require('../dbQueries/mongodb/queries');
const _ = require('lodash');
const {
    VacanciesModel
} = require('../dbQueries/mongodb/models');

const questions = {

    /**
     * Get Vacancies
     * @param data
     * @returns {Promise.<{meta: {status: string}, data: *}>}
     */

    getVacancies: async data => {
        try {
            const vacancies = await VacanciesModel.find({}, null).lean();
            return {
                meta: {
                    status: "200"
                },
                data: vacancies
            }
        } catch (err) {
            throw new Error(err);
        }

    }

};

module.exports = questions;