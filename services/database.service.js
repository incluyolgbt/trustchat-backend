const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = '';
const supabaseKey = '';

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })


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

    fetch(supabaseUrl + '/rest/v1/messages',
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
          'Authorization': 'Bearer ' + supabaseKey,
          'apikey': supabaseKey
        }
      });

    } catch (error) {
      console.error(error);
    }

}

module.exports = { find, addToDB };
