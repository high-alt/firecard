import functions from 'firebase-functions'
import next from 'next'
import admin from 'firebase-admin'

admin.initializeApp();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, conf: { distDir: '.next' } })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  exports.nextApp = functions.https.onRequest((req, res) => {
    return handle(req, res)
  })
})
