const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.URL_SUPABASE, process.env.TOKEN_SUPABASE , { auth: { persistSession: false } })


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
                        messageContent) {
  //agregar mensaje a base de datos pasar a db servicios

  try {

    fetch(process.env.URL_SUPABASE + '/rest/v1/messages',
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "id": messageId,
          "timestamp": messageTimestamp,
          "content": messageContent,
          "type": type,
          "id_from": messageFrom,
          "id_to": 'null'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.TOKEN_SUPABASE,
          'apikey': process.env.TOKEN_SUPABASE
        }
      });

    } catch (error) {
      console.error(error);
    }

}

module.exports = { find, addToDB };
