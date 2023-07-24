const { find, addToDB } = require('./../services/database.service');

const token = 'Bearer '

class Webhook {

  async answer(num, message) {

    fetch('',

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
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success answering'));

  }

  async read(messageId) {
    fetch('',

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
      }).then(res => res.json())
      .then(response => console.log('Success marking as read'))
      .catch(error => console.error('Error:', error));
  }

}

module.exports = Webhook;