import { users, pairing } from "../index.js"

function disponibility(req, res, next){

    Object.keys(users).forEach((user)=> {
        console.log(users[user].connections);
        //como le hago para determinar el usuario con menor conexiones
        //pairing[messageFrom] = user

        //una vez emparejado omitir ese usuario 
    });

    next();
}
export {disponibility}