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
    
    let arreglo = {user_id1: {
      socket_id: [socket_id1, ....]
      connected: true / false
      conversations: 0-10
    },
    .
    .
    .
    }

    let emparejamiento= {wa_num: user_id, ....}

    <!-- se conecta un agente (user_id):
    (user_id se obtiene de auth)
    arreglo[user_id].socket_id.push(socket.id); //no porque cada vez que actualizan página cambia el id  -->

    llega usuarie (wa_id):
      for de arreglo
          sí: tiene mucha carga?
            sí: siguiente user_id
            no: designar a ese user_id 
              emparejamiento[wa_id] = user_id;
              ¿cómo designar mín y máx de chats por agente?


    envío de mensajes ya designados:
    const agent_id = emparejamiento[messageFrom]
    let arreglo_socket_ids = arreglo[agent_id].socket_id

    enviar a cada arreglo_socket_ids.

    se desconecta un agente:
      desconexión temporal: ¿cómo saber si fue por falla de internet o definitivo?

      desconexión definitiva: 
      arreglo[user_id].connected = false;
      arreglo[user_id].socket_id = [];
      
      emparejamiento: ¿como borrar de emparejamiento?


//como le hago para determinar el usuario con menor conexiones selection sort

        manager determina el número máximo de chats per user
        
        //qué pasa si solo hay un user conectado?? 0 y luego 1 ... 
        //qué pasa si tengo tres users conectados con 1, 1, 2 ...
        //qué pasa si tengo tres users conectados con 2, 2, 1 ...
        //si se llega al límite de wa_ids por user qué?

        Manager asigna manualmente 

        // me va a marcar error si un wa_id manda mensaje y no hay usuaries conectados hacer lista de espera
        // que pasa si ese mensaje es enviado un día que no es chat de confianza 
        Manager desactiva modo chat de confianza al finalizar 

        Plataforma manager:
        Opción de actilet o desactilet modo chat de confianza 
          desactivado se resetea el arreglo pairing 
        ve users conectados y sus wa_ids asignados

        una vez alcanzados los límites le marca en menú aparte a quién asignarle

        tiene opción de chat manager que hace brodcast con todos los users 
