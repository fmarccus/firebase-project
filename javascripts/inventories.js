const formdata = $("#formdata"); //id for form
const datatable = $("#datatable");//id for tbody

//retrieves documents
function render(doc) {
    datatable.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-warning" name="select" href ="javascript:void(0)" id="${doc.id}">Select</a></td>
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().amount}</td>
    <td>${doc.data().quantity} pcs.</td>
    <td>Php ${doc.data().total}</td>
    <td>${doc.data().interest}</td>
    <td>Php ${doc.data().selling_price}</td>
    <td>${doc.data().available} pcs (${((doc.data().available / doc.data().quantity) * 100).toFixed(2)}%)</td>
    <td>${doc.data().quantity_sold} pcs (${((doc.data().quantity_sold / doc.data().quantity) * 100).toFixed(2)}%)</td>
    <td>Php ${doc.data().sales} (${((doc.data().sales / (doc.data().selling_price * doc.data().quantity)) * 100).toFixed(2)}%)</td>
    <td>Php ${doc.data().selling_price * doc.data().quantity}</td>
    <td>Php ${doc.data().projected_profit}</td>
    <td>${doc.data().delivery_address}</td>
    <td>${doc.data().supplier}</td>
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

    //when button with name edit is clicked, retrieve the data and send to form
    $("[name = 'select']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('inventories').doc(id).get().then(doc => {
            $('#delivery_address').val(doc.data().delivery_address);
            $('#item').val(doc.data().item);
            $('#amount').val(doc.data().amount);
            $('#interest').val(doc.data().interest);
            $('#quantity').val(doc.data().quantity);
            $('#total').val(doc.data().total);
            $('#date').val(doc.data().date);
            $('#document').val(doc.id);
        })
    })
}
//when button with id edit is clicked, edit the ORDER
$('#update').on('click', () => {
    var id = $('#document').val();
    db.collection('inventories').doc(id).set({
        delivery_address: $("#delivery_address").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        quantity: $("#quantity").val(),
        total: parseFloat($("#amount").val()) * parseFloat($("#quantity").val()),
        selling_price: parseFloat($("#amount").val()) + (parseFloat($("#amount").val()) * parseFloat($("#interest").val())),
        interest: $("#interest").val(),
        available: parseFloat($("#quantity").val()),
        quantity_sold: 0,
        sales: 0,
        projected_profit:
            ((parseFloat($("#amount").val()) + (parseFloat($("#amount").val()) * parseFloat($("#interest").val()))) * parseFloat($("#quantity").val())) -
            (parseFloat($("#amount").val()) * parseFloat($("#quantity").val())),
        date: Date()
    }, {
        merge: true
    })

    $("#delivery_address").val("");
    $("#item").val("");
    $("#amount").val("");
    $("#quantity").val("");
    $("#total").val("");
    $("#selling_price").val("");
    $("#interest").val("");
    $("#available").val("");
    $("#projected_profit").val("");
    $("#date").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item edited successfully!',
        showConfirmButton: false,
        timer: 1500
    })
})


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
