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

DB: soMjow-honmip-despu2
  
usar momentjs para el timestamp 

moment().format('MMMM Do YYYY, h:mm:ss a');

agregar apartado de sent delivered y read y su timestamp (acceder a clave foránea de status)

para actualizar los id temporales quizá generar un sistema de colas de ambas e irlas emparejando. FIFO 
Si hay alguna falla con la conexión el emparejamiento se detiene. 




