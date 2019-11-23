import * as firebase from 'firebase';

  const config = {
    apiKey: "AIzaSyCgN2k94iEsElSpJCB7qhJ8qhn3C3-m5e0",
    authDomain: "fundooreactjs.firebaseapp.com",
    databaseURL: "https://fundooreactjs.firebaseio.com",
    projectId: "fundooreactjs",
    storageBucket: "fundooreactjs.appspot.com",
    messagingSenderId: "44668288086"
  };
   firebase.initializeApp(config);
   const database = firebase.database();

   export { firebase, database as default };