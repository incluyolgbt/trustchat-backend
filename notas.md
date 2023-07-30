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

como manejar los from: id del usuario de la autentificación y hacia la persona que mandó el mensaje
  checar autentificación para Ui-server (quizá usar el id del auth de supabase)

guardar en DB los mensajes recibidos por socket no funciona porque solo tiene los ids del mensaje enviado por le usuarie y esos ya existen

agregar apartado de sent delivered y read y su timestamp (acceder a clave foránea de status)





