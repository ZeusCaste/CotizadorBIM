import firebase from "firebase/app";
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCmD2hzJuk1K6DViIVMCfgYuxMdoFz0h28",
    authDomain: "cotizadorbim.firebaseapp.com",
    databaseURL: "https://cotizadorbim-default-rtdb.firebaseio.com",
    projectId: "cotizadorbim",
    storageBucket: "cotizadorbim.appspot.com",
    messagingSenderId: "175200344450",
    appId: "1:175200344450:web:8ac95fe74c2b1485dcd79b",
    measurementId: "G-XF6NDTKYSG"
};

firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator('localhost', 5001);
// firebase.auth().useEmulator('localhost', 9099);
// firebase.firestore().useEmulator('localhost', 8081);

export default firebase;