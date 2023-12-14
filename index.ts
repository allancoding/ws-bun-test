const server = Bun.serve<{ authToken: string }>({
    port: 3000,
    fetch(req, server) {
      const success = server.upgrade(req);
      if (success) {
        return undefined;
      }
      return new Response(Bun.file("./index.html"));
    },
    websocket: {
      async message(ws, message) {
        if (message instanceof Buffer) {
          ws.send(message);
          const fileSize = message.length;
          console.log(`Received file with size: ${fileSize} bytes`);
        }else if (typeof message === "string") {
          ws.send(`${message}`);
          console.log(`Received ${message}`);
        } else {
          ws.send(message);
          console.log(`Received a message of type ${typeof message}`);
        }
      },
    },
  });

console.log(`Listening on ${server.hostname}:${server.port}`);