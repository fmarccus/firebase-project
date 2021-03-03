// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCz_pHD5F4_Tc3akTEwVIa50M26gKDOR6o",
    authDomain: "hci-assessment-task.firebaseapp.com",
    projectId: "hci-assessment-task",
    storageBucket: "hci-assessment-task.appspot.com",
    messagingSenderId: "951073773627",
    appId: "1:951073773627:web:175f6e0c7de7ad71d6641e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });