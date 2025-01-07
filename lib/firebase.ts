import {  FirebaseOptions, initializeApp } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDtyWunqtWQ6yIUIyP8Bs877stsYxjNOWY",
  authDomain: "firecard.firebaseapp.com",
  projectId: "firecard",
  storageBucket: "firecard.firebasestorage.app",
  messagingSenderId: "956581215227",
  appId: "1:956581215227:web:b01c4663145bdb722ca95e"
}

const app = initializeApp(firebaseConfig)

export default app
