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
const tabledata = $("#tabledata");


function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td><a class="uk-button uk-button-small uk-button-default" name="select" href ="javascript:void(0)" id="${doc.id}">Select</a></td>
    <td><a class="uk-button uk-button-small uk-button-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().name}</td>
    <td>${doc.data().phone}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().feedback}</td>
    <td>${doc.data().date}</td>
    </tr>`)

    $("[name = 'select']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('published').doc(id).get().then(doc => {
            $('#name').val(doc.data().name);
            $('#phone').val(doc.data().phone);
            $('#email').val(doc.data().email);
            $('#feedback').val(doc.data().feedback);
            $('#date').val(doc.data().date);
            $('#document').val(doc.id);
        })
    })
    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('published').doc(id).delete();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Feedback deleted!',
            showConfirmButton: false,
            timer: 1500
        })
    })
}
//when button with id arrived is clicked, add the item to INVENTORY
$('#unpublish').on('click', (e) => {
    e.preventDefault();
    db.collection('feedback').add({
        name: $("#name").val(),
        phone: $("#phone").val(),
        email: $("#email").val(),
        feedback: $("#feedback").val(),
        date: $("#date").val(),
    })
    e.stopImmediatePropagation();
    var id = $('#document').val();
    db.collection('published').doc(id).delete();

    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#feedback").val("");
    $("#document").val("");
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Feedback unpublished!',
        showConfirmButton: false,
        timer: 1500
    })
})
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