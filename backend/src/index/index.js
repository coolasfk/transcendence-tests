import path from 'path';
import wsRoute from '../shared/websockets/wsRoute.js';
import authRoutes from '../auth/infrastructure/authRoutes.js';
import fastifyStatic from '@fastify/static'; 
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../../frontend/dist');


export default async function registerRoutes(fastify) {
  // Register API routes
  await fastify.register(wsRoute);
  fastify.register(authRoutes);
  
  // Serve static file from frontend build dir
  fastify.register(fastifyStatic, {
    root: frontendDistPath,
    prefix: '/'
    // wildcard: false -> can prevent server from serving static files
    });
    
    // fastify.log.info("frontendDistPath : ", frontendDistPath);
  console.log("frontendDistPath : ", frontendDistPath);
  
  // Catch-all fallback: serve index.html for any GET request not handled
  fastify.setNotFoundHandler(async (request, response) => {
    
    if (request.raw.method === 'GET' && request.headers.accept?.includes('text/html')) {
      const indexFilePath = path.join(frontendDistPath, 'index.html');
      return response.type('text/html').send(fs.readFileSync(indexFilePath, 'utf-8'));
    } else {
      response.code(404).send({ error: 'Not Found' });
      }
  });
  }
  

  /*

*/