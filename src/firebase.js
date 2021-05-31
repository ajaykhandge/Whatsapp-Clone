// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAhQ7DiXzcOqWfbg-t9YloLUVQFDIwRYfs",
    authDomain: "whatsapp-clone-75f89.firebaseapp.com",
    projectId: "whatsapp-clone-75f89",
    storageBucket: "whatsapp-clone-75f89.appspot.com",
    messagingSenderId: "299378412232",
    appId: "1:299378412232:web:3e91430c3e327b49d4f3fd",
    measurementId: "G-50429XEJFK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;