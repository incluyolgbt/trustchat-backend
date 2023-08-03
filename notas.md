DB: soMjow-honmip-despu2
  
usar momentjs para el timestamp 
moment().format('MMMM Do YYYY, h:mm:ss a');

agregar apartado de sent delivered y read y su timestamp (acceder a clave foránea de status)
  para actualizar los id temporales quizá generar un sistema de colas de ambas e irlas emparejando. FIFO 
  Si hay alguna falla con la conexión el emparejamiento se detiene. 

Manejo de process.env

Generar un sistema de enrutamiento para designar usuaries a los diferentes colaboradores
    - manual que se asigne a cada persona 

    ¿interfaz gráfica para designar?

    - sistema automático: asignado y según si está conectado y disponibilidad 
    middleware antes de senderClientMessage
    
    var arreglo = {user_id1: {
      socket_id: [socket_id1, ....]
      connected: true / false
      conversations: 0-10
    },
    .
    .
    .
    }

    var emparejamiento= {wa_num: user_id, ....}

    se conecta un agente (user_id):
    (user_id se obtiene de auth)
    arreglo[user_id].socket_id.push(socket.id); //no porque cada vez que actualizan página cambia el id 

    llega usuarie (wa_id):
      for de arreglo
        el agente está conectado?  (quizá solo tener a los agentes conectados)
          sí: tiene mucha carga?
            sí: siguiente user_id
            no: designar a ese user_id 
              emparejamiento[wa_id] = user_id;
              ¿cómo designar mín y máx de chats por agente?
          no: siguiente user_id


    envío de mensajes ya designados:
    const agent_id = emparejamiento[messageFrom]
    var arreglo_socket_ids = arreglo[agent_id].socket_id

    enviar a cada arreglo_socket_ids.

    se desconecta un agente:
      desconexión temporal: ¿cómo saber si fue por falla de internet o definitivo?

      desconexión definitiva: 
      arreglo[user_id].connected = false;
      arreglo[user_id].socket_id = [];
      
      emparejamiento: ¿como borrar de emparejamiento?
