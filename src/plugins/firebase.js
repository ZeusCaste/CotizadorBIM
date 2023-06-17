import firebase from "firebase/app";
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// PROD
// const firebaseConfig = {
//     apiKey: "AIzaSyCmD2hzJuk1K6DViIVMCfgYuxMdoFz0h28",
//     authDomain: "cotizadorbim.firebaseapp.com",
//     databaseURL: "https://cotizadorbim-default-rtdb.firebaseio.com",
//     projectId: "cotizadorbim",
//     storageBucket: "cotizadorbim.appspot.com",
//     messagingSenderId: "175200344450",
//     appId: "1:175200344450:web:8ac95fe74c2b1485dcd79b",
//     measurementId: "G-XF6NDTKYSG"
// };

// DEV
const firebaseConfig = { 
  apiKey: "AIzaSyDWB_oUV2-3Gf9eJNgETGtUMBYbrVfaI9A",
  authDomain: "pruebascotizadorbim.firebaseapp.com",
  databaseURL: "https://pruebascotizadorbim-default-rtdb.firebaseio.com",
  projectId: "pruebascotizadorbim",
  storageBucket: "pruebascotizadorbim.appspot.com",
  messagingSenderId: "504464497510",
  appId: "1:504464497510:web:f1bb25ce75583fb87386a7"
};

firebase.initializeApp(firebaseConfig);
firebase.functions().useEmulator('localhost', 5001);
// firebase.auth().useEmulator('localhost', 9099);
// firebase.firestore().useEmulator('localhost', 8081);

export default firebase;