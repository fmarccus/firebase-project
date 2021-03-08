const datatable = $("#datatable");//id for tbody

function render(doc) {
    datatable.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().selling_price}</td>
    <td>${doc.data().quantity_sold} pcs</td>
    <td>Php ${doc.data().sum}</td>
    <td>${doc.id}</td>
    <td>${doc.data().date}</td>
    </tr>`)

    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('sales').doc(id).delete();
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
db.collection('sales').orderBy('date').onSnapshot(snapshot => {
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