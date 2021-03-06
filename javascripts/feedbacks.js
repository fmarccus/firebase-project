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

const formdata = $("#formdata");
const feedbacklist = $("#feedbacklist");

formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('feedback').add({
        name: $("#name").val(),
        phone: $("#phone").val(),
        email: $("#email").val(),
        feedback: $("#feedback").val()
    })
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#feedback").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Feedback sent. Thank you!',
        showConfirmButton: false,
        timer: 1500
    })
})


function render(doc) {
    datatable.append(`<tr id="${doc.id}"> 
    <td>${doc.data().name}</td>
    <td>${doc.data().phone}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().feedback}</td>
    </tr>`)
}

db.collection('feedback').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc)
        }
    })
})