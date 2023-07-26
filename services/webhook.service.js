const { find, addToDB } = require('./../services/database.service');

require('dotenv').config();

class Webhook {

  async answer(num, message) {
    //console.log('answer');
    try {
      await fetch(process.env.URL_WA,

        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({
            "messaging_product": "whatsapp",
            "preview_url": false,
            "recipient_type": "individual",
            "to": num,
            "type": "text",
            "text": {
              "body": message
            }
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.TOKEN_WA
          }
        });
    } catch (error) {
      console.error(error);
    }

  }

  async read(messageId) {

    //console.log('read');

    try {

      await fetch(process.env.URL_WA,

        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({
            "messaging_product": "whatsapp",
            "status": "read",
            "message_id": messageId
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.TOKEN_WA
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = Webhook;