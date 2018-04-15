/**
 * Node.js App configs
 */

const config = {

    mode: 'production', // development
    jwtSecret: 'evfwvehwj66ewcw%5w', // JWT secret
    port: parseInt(process.env.PORT, 10) || 3000,
    hostname: '127.0.0.1',
    mongoConf: {
        url: 'mongodb://ds061208.mlab.com:61208/recruiter',
        options: {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user: 'admin',
            pass: 'admin2018'
        }
    }

};

module.exports = config;