const formdata = $("#formdata");

$('#btnsubmit').on('click', () => {
    var id = $('#document').val();

    db.collection('inventories').doc(id).set({
        qsold: firebase.firestore.FieldValue.increment($("#quantity_item").val()),
        remaining: firebase.firestore.FieldValue.increment(-parseFloat($("#quantity_item").val())),//decrements the stocks in inventory
        sales: firebase.firestore.FieldValue.increment(parseFloat($("#quantity_item").val()) * parseFloat($("#selling_price").val()))
    }, {
        merge: true
    })
    $("#quantity_item").val("");
    $("#document").val("");
    $("#selling_price").val("");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sold!',
        showConfirmButton: false,
        timer: 1500
    })
})