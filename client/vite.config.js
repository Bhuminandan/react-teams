import fs from 'fs';
import path from 'path';

export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/cert.crt')),
    },
    // Make sure the server is accessible over the local network
    host: '0.0.0.0',
  },
};