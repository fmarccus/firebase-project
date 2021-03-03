const formdata = $("#formdata");
const tasklist = document.querySelector('#tasklist');



formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('tasks').add({
        title: $("#title").val(),
        objective: $("#objective").val(),
        accomplish: $("#accomplish").val(),
        date: Date(),

    })
    $("#title").val("");
    $("#objective").val("");
    $("#accomplish").val("");
    $("#date").val("");

    alert("New Task Added!");
})

function render(doc) {
    let column = document.createElement('div');
    let card = document.createElement('div');
    let cardbody = document.createElement('div');
    let cardtitle = document.createElement('h4');
    let objective = document.createElement('li');
    let accomplish = document.createElement('li');
    let date = document.createElement('li');
    let cross = document.createElement('a');

    column.setAttribute('class', 'col-md-4 mb-2');
    column.setAttribute('data-id', doc.id);//column because it has to be deleted too for real time response
    card.setAttribute('class', 'card')
    cardbody.setAttribute('data-id', doc.id);//card body because this is the parent element of the delete text
    cardbody.setAttribute('class', 'card-body');
    cardtitle.setAttribute('class', 'card-title mb-4')


    cardtitle.textContent = doc.data().title;
    objective.textContent = doc.data().objective;
    accomplish.textContent = doc.data().accomplish;
    date.textContent = doc.data().date;

    cross.textContent = "Delete";
    cross.setAttribute('class', 'text-danger');
    cross.style.cursor = "pointer";


    cardbody.appendChild(cardtitle);
    cardbody.appendChild(objective);
    cardbody.appendChild(accomplish);
    cardbody.appendChild(date);
    cardbody.appendChild(cross);

    card.appendChild(cardbody);
    column.appendChild(card);
    tasklist.appendChild(column);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('tasks').doc(id).delete();
    });
}

db.collection('tasks').orderBy('accomplish').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc);
        } else if (change.type == 'removed') {
            let delete_record = tasklist.querySelector('[data-id=' + change.doc.id + ']');
            tasklist.removeChild(delete_record);
        }
    });
});