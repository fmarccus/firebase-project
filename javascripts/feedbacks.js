// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAHjUOvKT2BPn3LoaI4q645bz8ZOf0jALk",
    authDomain: "feedback-8f7fb.firebaseapp.com",
    projectId: "feedback-8f7fb",
    storageBucket: "feedback-8f7fb.appspot.com",
    messagingSenderId: "686747006632",
    appId: "1:686747006632:web:3f6841360716c95493349d",
    measurementId: "G-PSZHGRF1VT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });