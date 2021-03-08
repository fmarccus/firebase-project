const formdata = $("#formdata"); //id for form
const datatable = $("#datatable");//id for tbody

//add data to ORDERS
formdata.on('submit', (e) => {
    e.preventDefault();
    db.collection('orders').add({
        supplier: $("#supplier").val(),
        delivery_address: $("#delivery_address").val(),
        contact: $("#contact").val(),
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
    })
    $("#supplier").val("");
    $("#delivery_address").val("");
    $("#contact").val("");
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
        title: 'New order added successfully!',
        showConfirmButton: false,
        timer: 1500
    })
})

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
    <td>${doc.data().delivery_address}</td>
    <td>${doc.data().supplier}</td>
    <td>${doc.data().contact}</td>
    <td>${doc.data().date}</td>
    </tr>`)


    //when button with name delete is clicked, delete the document
    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('orders').doc(id).delete();
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
        db.collection('orders').doc(id).get().then(doc => {
            $('#supplier').val(doc.data().supplier);
            $('#delivery_address').val(doc.data().delivery_address);
            $('#contact').val(doc.data().contact);
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
    db.collection('orders').doc(id).set({
        supplier: $("#supplier").val(),
        delivery_address: $("#delivery_address").val(),
        contact: $("#contact").val(),
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
    $("#supplier").val("");
    $("#delivery_address").val("");
    $("#contact").val("");
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
        title: 'Order editd successfully!',
        showConfirmButton: false,
        timer: 1500
    })
})
//when button with id arrived is clicked, add the item to INVENTORY
$('#to_inventory').on('click', (e) => {
    e.preventDefault();
    db.collection('inventories').add({
        supplier: $("#supplier").val(),
        delivery_address: $("#delivery_address").val(),
        contact: $("#contact").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        quantity: $("#quantity").val(),
        total: parseFloat($("#amount").val()) * parseFloat($("#quantity").val()),
        selling_price: parseFloat($("#amount").val()) + (parseFloat($("#amount").val()) * parseFloat($("#interest").val())),
        interest: $("#interest").val(),
        available: firebase.firestore.FieldValue.increment(parseFloat($("#quantity").val())),
        quantity_sold: 0,
        sales: 0,
        projected_profit:
            ((parseFloat($("#amount").val()) + (parseFloat($("#amount").val()) * parseFloat($("#interest").val()))) * parseFloat($("#quantity").val())) -
            (parseFloat($("#amount").val()) * parseFloat($("#quantity").val())),
        date: Date()
    })
    e.stopImmediatePropagation();
    var id = $('#document').val();
    db.collection('orders').doc(id).delete();
    $("#supplier").val("");
    $("#delivery_address").val("");
    $("#contact").val("");
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
        title: 'Item sent to inventory!',
        showConfirmButton: false,
        timer: 1500
    })
})

//real time rendering of data
db.collection('orders').orderBy('total').onSnapshot(snapshot => {
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
