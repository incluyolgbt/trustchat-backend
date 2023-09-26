import "dotenv/config.js";
import fetch from "node-fetch";

class Webhook {

  async answer(num, message) {
    try {
      return await fetch(process.env.FB_URL,

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

      const data = await fetch(process.env.FB_URL,

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

      return data;
    } catch (error) {
      console.error(error);
    }
  }

}

export { Webhook };