import {  FirebaseOptions, initializeApp } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDtyWunqtWQ6yIUIyP8Bs877stsYxjNOWY",
  authDomain: "firecard.firebaseapp.com",
  projectId: "firecard",
  storageBucket: "firecard.firebasestorage.app",
  messagingSenderId: "956581215227",
  appId: "AIzaSyDtyWunqtWQ6yIUIyP8Bs877stsYxjNOWY"
}

const app = initializeApp(firebaseConfig)

export default app
