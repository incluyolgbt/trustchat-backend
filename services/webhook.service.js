import "dotenv/config.js";
import { response } from 'express';
import fetch from "node-fetch";

class Webhook {

  async answer(num, message) {

    const resp = await fetch(process.env.FB_URL,
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
    })
    .catch((e) => { console.log(e) });

    if (resp.ok) {
      return resp.json();
    } else {
      console.log('Error:', response)
    }

  }

  async read(messageId) {
    const resp = await fetch(process.env.FB_URL,
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
      }).catch((e) => { console.log(e) });

    if (resp.ok) {
      return resp.json();
    } else {
      console.log('Error:', response)
    }
  }

}

export { Webhook };