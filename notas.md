// definir que tipo es: status o message

  // si es menssaje que tipo de mensaje es: texto, multimedia, etc. 
  // guardar en DB para no mandar mas mensajes 
  // colocar en leido cuando se haga algo con ese mensaje 
  // Usuarie manda mensaje: contestar con template de chatbot 
  //      chatbot: quieres apoyo inmediato (chatbot salud mental)
  //    quieres agendar un chat de confianza 
  //quieres terapia 
  // 
  // Responder: dependiendo de la opcion 
  // para chat de confianza mandar a otro numero de asesor 

  // entidades: mensajes [texto, timestamp (3) y status (quiza multimodal por read, delive, etc.), id, from (contacts), to (contacts)] contactos [id, nombre, num] conversaciones (relacion entre contactos from y to) [id, penasar en mas atributos] 

  checar supabase

  DB: soMjow-honmip-despu2


  

buscar con regex el 521 para que solo sea 52 para no dañar numeros de otros paises. String.replace();

usar momentjs para el timestamp 

let cstTime = new Date(createdAt).toLocaleString({
    timeZone: "America/Mexico_City" });