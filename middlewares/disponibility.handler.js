import { users, pairing, maxConnections } from "../index.js"

function disponibility(req, res, next) {
    let messageFrom = req.body.entry[0].changes[0].value.messages[0].from;
    messageFrom = messageFrom.replace(/^521/i, '52');

    console.log('pairing: ', pairing)
    if (pairing[messageFrom] !== undefined) return next(); //una vez emparejado omitir ese usuario 

    let tempConnections = maxConnections;
    let tempUser = '';
    let shouldSkip = false;
    Object.keys(users).forEach((user) => {

        console.log('connections: ', users[user].connections);

        if (users[user].connections === 0) {
            //ese user tiene 0 connections hay que asignarlo
            tempUser = user;
            shouldSkip = true;
            return; // ya no necesito continuar el bucle 
        } else if (users[user].connections <= tempConnections) {
            tempConnections = users[user].connections; // ese usuario tiene el mismo o menos connections que el anterior 
            tempUser = user; // definir ese usuario como el que tiene el mismo o menor número de conexiones 
        }
        // entonces ese usuario tiene más que el anterior, omitir
    });

    // después del bucle se obtiene el user con menor número de conexiones. Hay que asignarlo 
    pairing[messageFrom] = tempUser;
    users[tempUser]['connections']++;
    console.log(pairing, users[tempUser]['connections'])
    next();
}
export { disponibility }