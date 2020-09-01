// import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADFPSCN6xlspc5xnVwKepAyhq8j8lQknI",
    authDomain: "slack-57099.firebaseapp.com",
    databaseURL: "https://slack-57099.firebaseio.com",
    projectId: "slack-57099",
    storageBucket: "slack-57099.appspot.com",
    messagingSenderId: "1073618910396",
    appId: "1:1073618910396:web:d4118d86d52a87d04324b9",
    measurementId: "G-PGY58JMEF2"
};

/*const firebaseApp =*/ firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const persistence = firebase.auth.Auth.Persistence.SESSION;

export {auth, provider, persistence};
export default db;