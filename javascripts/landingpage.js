const book_rows = $("#book_rows"); //id for form


//retrieves documents
function render(doc) {
    book_rows.append(`
    <div class="col-md-3" id="${doc.id}">
        <div class="card-reco" style="width:250px;">
        <img class="card-img-top mt-3" src="/images/books_reco/${doc.data().item}.jpg" alt="Card image"
        style="width:100%">
        <div class="card-body">
        <p class="card-title">${doc.data().item}</p>
        <p class="card-text">Available: ${doc.data().available} pcs</p>
        <p class="card-price">P${doc.data().selling_price}<i class="fa fa-star text-warning ml-3"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
            <i class="fa fa-star text-warning"></i>
        </p>
            </div>
        </div>
    </div>`)
}
//real time rendering of data
db.collection('inventories').orderBy('item').onSnapshot(snapshot => {
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
            document.location.reload();
        }
    })
})
