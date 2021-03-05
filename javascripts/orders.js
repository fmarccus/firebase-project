const formdata = $("#formdata");
const tabledata = $("#tabledata");

formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('orders').add({
        customer: $("#supplier").val(),
        deliver: $("#deliver").val(),
        contact: $("#contact").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        quantity: $("#quantity").val(),
        saleprice: parseFloat($("#amount").val()) + parseFloat(($("#amount").val() * 0.25)),
        qsold: 0,
        remaining: $("#quantity").val(),
        sales: 0,
        total: $("#amount").val() * $("#quantity").val(),
        date: Date()

    })
    $("#supplier").val("");
    $("#deliver").val("");
    $("#contact").val("");
    $("#item").val("");
    $("#amount").val("");
    $("#saleprice").val("");
    $("#quantity").val("");
    $("#total").val("");
    $("#date").val("");

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New order added successfully!',
        showConfirmButton: false,
        timer: 1500
    })
})


function render(doc) {
    tabledata.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-light" name="arrived" href ="javascript:void(0)" id="${doc.id}">Arrived</a></td>
    <td><a class="btn btn-sm btn-warning" name="update" href ="javascript:void(0)" id="${doc.id}">Edit</a></td>
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().customer}</td>
    <td>${doc.data().deliver}</td>
    <td>${doc.data().contact}</td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().amount}</td>
    <td style="display:none;">Php ${doc.data().saleprice}</td>
    <td>${doc.data().quantity} pcs.</td>
    <td>Php ${doc.data().total}</td>
    <td>${doc.data().date}</td>
    </tr>`)



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

    $("[name = 'update']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('orders').doc(id).get().then(doc => {
            $('#supplier').val(doc.data().customer);
            $('#deliver').val(doc.data().deliver);
            $('#contact').val(doc.data().contact);
            $('#item').val(doc.data().item);
            $('#amount').val(doc.data().amount);
            $('#quantity').val(doc.data().quantity);
            $('#total').val(doc.data().total);
            $('#date').val(doc.data().date);
            $('#document').val(doc.id);
        })
    })
    $("[name = 'arrived']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('orders').doc(id).get().then(doc => {
            $('#supplier').val(doc.data().customer);
            $('#deliver').val(doc.data().deliver);
            $('#contact').val(doc.data().contact);
            $('#item').val(doc.data().item);
            $('#amount').val(doc.data().amount);
            $('#saleprice').val(doc.data().saleprice);
            $('#quantity').val(doc.data().quantity);
            $('#total').val(doc.data().total);
            $('#date').val(doc.data().date);
            $('#document').val(doc.id);
        })
    })

}

$('#arrived').on('click', (e) => {
    e.preventDefault();
    db.collection('inventories').add({
        customer: $("#supplier").val(),
        deliver: $("#deliver").val(),
        contact: $("#contact").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        saleprice: $("#saleprice").val(),
        qsold: 0,
        remaining: $("#quantity").val(),
        sales: 0,
        quantity: $("#quantity").val(),
        total: $("#amount").val() * $("#quantity").val(),
        date: Date()
    })
    e.stopImmediatePropagation();
    var id = $('#document').val();
    db.collection('orders').doc(id).delete();

    $("#supplier").val("");
    $("#deliver").val("");
    $("#contact").val("");
    $("#item").val("");
    $("#amount").val("");
    $("#saleprice").val("");
    $("#quantity").val("");
    $("#total").val("");
    $("#date").val("");
    $("#document").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item sent to inventory!',
        showConfirmButton: false,
        timer: 1500
    })
})

$('#update').on('click', () => {
    var id = $('#document').val();
    db.collection('orders').doc(id).set({
        customer: $("#supplier").val(),
        deliver: $("#deliver").val(),
        contact: $("#contact").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        saleprice: parseFloat($("#amount").val()) + parseFloat(($("#amount").val() * 0.25)),
        qsold: 0,
        remaining: $("#quantity").val(),
        sales: 0,
        quantity: $("#quantity").val(),
        total: $("#amount").val() * $("#quantity").val(),
        date: Date()
    }, {
        merge: true
    })
    $("#supplier").val("");
    $("#deliver").val("");
    $("#contact").val("");
    $("#item").val("");
    $("#amount").val("");
    $("#saleprice").val("");
    $("#quantity").val("");
    $("#total").val("");
    $("#date").val("");
    $("#document").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Order updated successfully!',
        showConfirmButton: false,
        timer: 1500
    })
})




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
