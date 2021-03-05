const tabledata = $("#tabledata");//id of tbody

//retrieves all documents
function render(doc) {
    tabledata.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().amount}</td>
    <td>${doc.data().quantity} pcs.</td>    
    <td>Php ${doc.data().total}</td>
    <td>${doc.data().remaining} pcs</td>
    <td>Php ${doc.data().saleprice}</td>
    <td>${doc.data().qsold} pcs</td>
    <td>Php ${doc.data().sales}</td>
    <td>Php ${(doc.data().saleprice * doc.data().quantity) - doc.data().total}</td>
    <td>${doc.data().customer}</td>
    <td>${doc.data().deliver}</td>
    <td>${doc.data().contact}</td>           
    <td>${doc.data().date}</td>
    </tr>`)


    //when button with name delete is clicked, delete the document
    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('inventories').doc(id).delete();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Order deleted!',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

//real time rendering of data
db.collection('inventories').orderBy('total').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc);
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
