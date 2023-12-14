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
        console.log(`Received ${message}`);
        ws.send(`You said: ${message}`);
      },
    },
  });

console.log(`Listening on ${server.hostname}:${server.port}`);