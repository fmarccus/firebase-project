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
        total: $("#amount").val() * $("#quantity").val(),
        date: Date()

    })
    $("#customer").val("");
    $("#deliver").val("");
    $("#contact").val("");
    $("#item").val("");
    $("#amount").val("");
    $("#quantity").val("");
    $("#total").val("");
    $("#date").val("");

    alert("New Order Added!");
})


function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td><a class="btn btn-sm btn-warning" name="update" href ="javascript:void(0)" id="${doc.id}">Remove</a></td>
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().customer}</td>
    <td>${doc.data().deliver}</td>
    <td>${doc.data().contact}</td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().amount}</td>
    <td>${doc.data().quantity} pcs.</td>
    <td>Php ${doc.data().total}</td>
    <td>${doc.data().date}</td>
    </tr>`)

    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('orders').doc(id).delete();
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
}

$('#update').on('click', () => {
    var id = $('#document').val();

    db.collection('orders').doc(id).set({
        customer: $("#supplier").val(),
        deliver: $("#deliver").val(),
        contact: $("#contact").val(),
        item: $("#item").val(),
        amount: $("#amount").val(),
        quantity: $("#quantity").val(),
        total: $("#amount").val() * $("#quantity").val(),
        date: Date()
    }, {
        merge: true
    })
})



db.collection('orders').orderBy('customer').onSnapshot(snapshot => {
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