import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv'
dotenv.config();

const supabase = createClient('', '' , { auth: { persistSession: false } })


async function find(id) {
  try {
    let { data: messages, error } = await supabase.from('messages').select('*').eq('id', id);
    return messages
  } catch (error) {
    console.error(error)
  }
}

async function addToDB(type,
                        messageFrom,
                        messageTimestamp,
                        messageId,
                        messageContent, 
                        messageTo) {
  //agregar mensaje a base de datos pasar a db servicios

  try {

    fetch('' + '/rest/v1/messages',
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "id": messageId,
          "timestamp": messageTimestamp,
          "content": messageContent,
          "type": type,
          "id_from": messageFrom,
          "id_to": messageTo
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + '',
          'apikey': ''
        }
      });

    } catch (error) {
      console.error(error);
    }

}

export { find, addToDB };
