import "dotenv/config.js";

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPA_URL, process.env.SUPA_TOKEN, { auth: { persistSession: false } })


async function find(id) {
  try {
    let { data: messages, error } = await supabase.from('messages').select('*').eq('id', id);
    return messages
  } catch (error) {
    console.error(error)
  }
}

async function findUser(number) {
  try {
    let { data: messages, error } = await supabase.from('contacts').select('*').eq('wa_num', number);
    return messages
  } catch (error) {
    console.error(error)
  }
}

async function findUserNumber(id) {
  try {
    let { data: number, error } = await supabase.from('contacts').select('wa_num').eq('id', id);
    return number[0]['wa_num']
  } catch (error) {
    console.error(error)
  }
}

async function addUserToDB(name, number) {
  try {

    fetch(process.env.SUPA_URL + '/rest/v1/contacts',
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "name": name,
          "wa_num": number
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.SUPA_TOKEN,
          'apikey': process.env.SUPA_TOKEN
        }
      });

  } catch (error) {
    console.error(error);
  }

}

async function addToDB(type,
  messageFrom,
  messageTimestamp,
  messageId,
  messageContent,
  messageTo,
  direction) {
  //agregar mensaje a base de datos pasar a db servicios
  try {
    fetch(process.env.SUPA_URL + '/rest/v1/messages',
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
          "id": messageId,
          "timestamp": messageTimestamp,
          "content": messageContent,
          "type": type,
          "user_id": messageTo,//(messageFrom.includes('-') ? messageFrom : messageTo),
          "contact_id": messageFrom,//(messageFrom.includes('-') ? messageTo : messageFrom),
          "direction": direction,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.SUPA_TOKEN,
          'apikey': process.env.SUPA_TOKEN
        }
      });

  } catch (error) {
    console.error(error);
  }

}

export { find, addToDB, findUser, addUserToDB, findUserNumber };
