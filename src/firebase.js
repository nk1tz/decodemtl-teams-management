import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCTy4Ac74wFU7DGLx0bq4y91D0BC2tjr70",
  authDomain: "decodemtl-teams-management.firebaseapp.com",
  databaseURL: "https://decodemtl-teams-management.firebaseio.com",
  projectId: "decodemtl-teams-management",
  storageBucket: "decodemtl-teams-management.appspot.com",
  messagingSenderId: "460442184119"
};

export default firebase.initializeApp(config).database()
