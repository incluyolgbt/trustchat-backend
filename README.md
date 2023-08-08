## Chat web server 
This web server was created in collaboration with the social entrepreneurship [Incluyo](https://incluyo.lgbt "Incluyo") to achieve a system of attention to LGBTQ+ people in a direct way in which their privacy is prioritized.

It was created in ExpressJS with the help of the WhatsApp Business API webhook and socket.io.

This server receives the WhatsApp webhook requests directly from the Incluyo help number. These requests are processed according to the type: status or message. The data is fetched and cleaned from the request to be stored in the Supabase database and finally sends the messages to the UI client via WebSockets for real-time communication.

## Instalation.
### Requierements.
- Node: v18.17.0 
- Ngrok: version 3.3.1

### Installation of dependencies.
With npm:
```bash
npm install
```
### Setting environment variables.
To have access, it is required to create or ask for document `.env` with four variables:

- SUPA_URL: The url of supabase database.
- SUPA_TOKEN: Token provided by supabase.
- FB_URL: Url specified by WhatsApp Business API. 
- FB_TOKEN: Token provided by WhatsApp Business API to be able to send messages by this web server. 

## Execution 
Once all the dependencies are installed, the web server will execute locally with the following:
```bash
npm run dev
```
You will know everything is running correctly when the console displays: "ServerSocket on port 8080" and "Server on port 3000".


