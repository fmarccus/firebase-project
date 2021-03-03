const formdata = $("#formdata");
const tabledata = $("#tabledata");


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

})


function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td>${doc.data().lastname}</td>
    <td>${doc.data().firstname}</td>
    <td>${doc.data().middlename}</td>
    <td>${doc.data().age}</td>
    <td>${doc.data().sex}</td>
    <td>${doc.data().nationality}</td>
    <td>${doc.data().job}</td>
    <td>Php ${doc.data().salary}</td>
    </tr>`)
}

db.collection('employees').orderBy('lastname').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc)
        }
    })
})