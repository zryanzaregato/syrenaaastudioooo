import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-frames-dev',
      configureServer(server) {
        server.middlewares.use('/frames', (req, res, next) => {
          const cleanUrl = req.url.split('?')[0].replace(/^\//, '');
          const framePath = path.join(__dirname, 'ezgif-53379f049ba6e574-png-split', cleanUrl);
          if (fs.existsSync(framePath)) {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            fs.createReadStream(framePath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
