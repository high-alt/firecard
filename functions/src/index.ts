import * as functions from 'firebase-functions';
import next from 'next';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Firebase function to handle all requests
  exports.nextApp = functions.https.onRequest((req, res) => {
    return handle(req, res);
  });
});
