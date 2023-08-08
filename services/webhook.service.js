import "dotenv/config.js";
class Webhook {

  async answer(num, message) {
    try {
      await fetch(process.env.FB_URL,

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
            'Authorization': 'Bearer ' + process.env.FB_TOKEN
          }
        });
    } catch (error) {
      console.error(error);
    }

  }

  async read(messageId) {

    try {

      await fetch(process.env.FB_URL,

        {
          method: 'POST', // or 'PUT'
          body: JSON.stringify({
            "messaging_product": "whatsapp",
            "status": "read",
            "message_id": messageId
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.FB_TOKEN
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

}

export {Webhook};