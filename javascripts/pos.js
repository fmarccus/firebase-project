const datatable = $("#datatable");

function render(doc) {


    datatable.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-success" name="select" href ="javascript:void(0)" id="${doc.id}">Select</a></td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().selling_price}</td>
    <td>${doc.data().available} pcs</td>
    <td>${doc.id} </td>
    </tr>`)

    //transfers the value of an item in the form field
    $("[name = 'select']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('inventories').doc(id).get().then(doc => {
            $('#item').val(doc.data().item);
            $('#selling_price').val(doc.data().selling_price);
            $('#document').val(doc.id);
        })
    })

}
//if btnsubmit is clicked, update the inventories
$('#btnsubmit').on('click', () => {
    var id = $('#document').val();
    db.collection('inventories').doc(id).set({
        quantity_sold: firebase.firestore.FieldValue.increment($("#quantity_sold").val()),
        available: firebase.firestore.FieldValue.increment(-parseFloat($("#quantity_sold").val())),//decrements + update the stocks in inventory
        sales: firebase.firestore.FieldValue.increment(parseFloat($("#sum").val()))
    }, {
        merge: true
    })
    $("#document").val("");

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New purchase was made!',
        showConfirmButton: false,
        timer: 1500
    })
    db.collection('sales').add({
        item: $("#item").val(),
        selling_price: $("#selling_price").val(),
        quantity_sold: $("#quantity_sold").val(),
        sum: $("#sum").val(),
        date: Date()
    })
    $("#item").val("");
    $("#selling_price").val("");
    $("#quantity_sold").val("");
    $("#sum").val("");
    $("#document").val("");
})




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
