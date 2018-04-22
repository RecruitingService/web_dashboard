
const request = require('request');
require('dotenv').config();

const telegram = {

    sendMessage

};

function sendMessage(body) {
    const { chatId, text } = body;
    const URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    // const keyboard = {
    //     keyboard: [
    //         [
    //             {"text": texts.yesAnswer},
    //             {"text": texts.noAnswer}
    //         ]
    //     ],
    //     one_time_keyboard: true,
    //     // resize_keyboard: true
    // };
    request.post(URL, {
        form: {
            chat_id: chatId,
            disable_web_page_preview: 1,
            text,
        }
    }, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        return {
            meta: {
                status: '200'
            },
            data: true
        };
    });
}

module.exports = telegram;
