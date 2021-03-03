const formdata = $("#formdata");
const tabledata = $("#tabledata");


formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('orders').add({
        customer: $("#customer").val(),
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
    <td>${doc.data().customer}</td>
    <td>${doc.data().deliver}</td>
    <td>${doc.data().contact}</td>
    <td>${doc.data().item}</td>
    <td>Php ${doc.data().amount}</td>
    <td>${doc.data().quantity} pcs.</td>
    <td>Php ${doc.data().total}</td>
    <td>${doc.data().date}</td>
    </tr>`)
}

db.collection('orders').orderBy('customer').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc)
        }
    })
})