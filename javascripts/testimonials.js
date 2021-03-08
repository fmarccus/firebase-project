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


const sortable = $("#sortable");


function render(doc) {
    sortable.append(`<li id="${doc.id}"> 
    <div class="uk-card uk-card-default uk-card-body">
    <b>${doc.data().name}</b>
    <hr>
    ${doc.data().feedback}
    <hr>
    <small>${doc.data().date}</small>
    </div>
    </li>`)

}

db.collection('published').orderBy('date').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc)
        } else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();
        }
        else if (change.type == "modified") {
            var id = change.doc.id;
            $('#' + id).remove();
            render(change.doc);
        }
    })
})
//25476d