const { find, addToDB } = require('./../services/database.service');

const token = 'Bearer '

class Webhook {

  async answer(num, message) {
    //console.log('answer');
    try {
      await fetch('',

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
            'Authorization': token
          }
        });
    } catch (error) {
      console.error(error);
    }

  }

  async read(messageId) {

    //console.log('read');

    try {

      await fetch('',

        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({
            "messaging_product": "whatsapp",
            "status": "read",
            "message_id": messageId
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = Webhook;