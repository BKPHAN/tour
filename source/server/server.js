import { createServer as createHttpServer } from 'node:http';
import { createApp } from './app.js';
import { env } from './src/config/env.js';

/**
 * Khởi động HTTP server cho backend người dùng.
 */
async function startServer() {
  const httpServer = createHttpServer();
  const app = await createApp({ httpServer });

  // Attach Express after configuration so Vite HMR can share this HTTP server in development.
  httpServer.on('request', app);

  httpServer.listen(env.backendPort, () => {
    console.log(
      `[server] ${env.appName} is running at ${env.backendUrl} (${env.appEnv})`,
    );
  });
}

startServer();
