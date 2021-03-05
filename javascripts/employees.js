const formdata = $("#formdata"); //id for form
const tabledata = $("#tabledata"); //id for tbody

//add record
formdata.on('submit', (e) => {
    e.preventDefault();
    db.collection('employees').add({
        lastname: $("#lastname").val(),
        firstname: $("#firstname").val(),
        middlename: $("#middlename").val(),
        age: $("#age").val(),
        sex: $("#sex").val(),
        nationality: $("#nationality").val(),
        job: $("#job").val(),
        salary: $("#salary").val(),
    })
    $("#lastname").val("");
    $("#firstname").val("");
    $("#middlename").val("");
    $("#age").val("");
    $("#sex").val("");
    $("#nationality").val("");
    $("#job").val("");
    $("#salary").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New employee added!',
        showConfirmButton: false,
        timer: 1500
    })
})

//retrieve records
function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td><a class="btn btn-sm btn-warning" name="update" href ="javascript:void(0)" id="${doc.id}">Edit</a></td>
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().lastname}</td>
    <td>${doc.data().firstname}</td>
    <td>${doc.data().middlename}</td>
    <td>${doc.data().age}</td>
    <td>${doc.data().sex}</td>
    <td>${doc.data().nationality}</td>
    <td>${doc.data().job}</td>
    <td>Php ${doc.data().salary}</td>
    </tr>`)

//when button with name delete is click, delete the document
    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('employees').doc(id).delete();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Employee deleted!',
            showConfirmButton: false,
            timer: 1500
        })
    })

//when button with name update is click, retrieve the data and send to form
    $("[name = 'update']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('employees').doc(id).get().then(doc => {
            $('#lastname').val(doc.data().lastname);
            $('#firstname').val(doc.data().firstname);
            $('#middlename').val(doc.data().middlename);
            $('#age').val(doc.data().age);
            $('#sex').val(doc.data().sex);
            $('#nationality').val(doc.data().nationality);
            $('#job').val(doc.data().job);
            $('#salary').val(doc.data().salary);
            $('#document').val(doc.id);
        })
    })
}
//when button with id update is click, update the document
$('#update').on('click', () => {
    var id = $('#document').val();
    db.collection('employees').doc(id).set({
        lastname: $("#lastname").val(),
        firstname: $("#firstname").val(),
        middlename: $("#middlename").val(),
        age: $("#age").val(),
        sex: $("#sex").val(),
        nationality: $("#nationality").val(),
        job: $("#job").val(),
        salary: $("#salary").val()
    }, {
        merge: true
    })
    $("#lastname").val("");
    $("#firstname").val("");
    $("#middlename").val("");
    $("#age").val("");
    $("#sex").val("");
    $("#nationality").val("");
    $("#job").val("");
    $("#salary").val("");
    $("#document").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee data updated!',
        showConfirmButton: false,
        timer: 1500
    })
})
//real time rendering
db.collection('employees').orderBy('salary').onSnapshot(snapshot => {
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