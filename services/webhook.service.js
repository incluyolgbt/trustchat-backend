import dotenv from 'dotenv'
dotenv.config();

class Webhook {

  async answer(num, message) {
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
            'Authorization': 'Bearer '
          }
        });
    } catch (error) {
      console.error(error);
    }

  }

  async read(messageId) {

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
            'Authorization': 'Bearer '
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

}

export {Webhook};