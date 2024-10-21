function init() {
  getFromLocalStorage();
  renderBooksTemplate();
}

function renderBooksTemplate() {
  let contentRef = document.getElementById("album");
  contentRef.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    contentRef.innerHTML += booksTemplate(i);
  }
  
  dataBooks();
}

function dataBooks() {
  // Für jedes Buch die Kommentare und Like-Status anzeigen
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let bookCommentsSection = document.getElementById(`commentSection-${i}`);

    // Setzt die Kommentare zurück
    bookCommentsSection.innerHTML = "";

    // Kommentare hinzufügen
    for (let j = 0; j < book.comments.length; j++) {
      bookCommentsSection.innerHTML += `<p>[${book.comments[j].name}] :</p><p><i>${book.comments[j].comment}</i></p>`;
    }

    // Liked-Status für das Herz anzeigen
    let likeHeart = document.getElementById(`likeHeart-${i}`);
    let likesCount = document.getElementById(`likes-${i}`);

    if (book.liked) {
      likeHeart.classList.add("liked");
    } else {
      likeHeart.classList.remove("liked");
    }

    // Event Listener für das Herz zum Liken
    likeHeart.addEventListener("click", function () {
      toggleLike(i); // Verwende das aktuelle Buch in der Schleife
    });

    // Aktualisiert die Anzahl der Likes
    likesCount.innerHTML = book.likes;
  }
}

function toggleLike(bookIndex) {
  let book = books[bookIndex]; // Buch-Array verwenden
  let likeHeart = document.getElementById(`likeHeart-${bookIndex}`);
  let likesCount = document.getElementById(`likes-${bookIndex}`);

  if (book.liked) {
    book.likes--;
    book.liked = false;
    likeHeart.classList.remove("liked"); // Herz grau machen
  } else {
    book.likes++;
    book.liked = true;
    likeHeart.classList.add("liked"); // Herz rot machen
  }

  // Likes im HTML aktualisieren
  likesCount.innerHTML = book.likes;

  // Daten speichern
  saveData();
}

function addComment(bookIndex) {
  let commentInput = document.getElementById(`commentInput-${bookIndex}`).value;
  let commentRef = document.getElementById(`commentSection-${bookIndex}`);

  if (commentInput == "") {
    alert("Bitte Kommentar einfügen!");
    return;
  }

  // Kommentar im DOM anzeigen
  commentRef.innerHTML += `<p><b>[USER] :</b></p><p><i>${commentInput}</i></p>`;

  // Kommentar zum Buch-Daten-Array hinzufügen
  books[bookIndex].comments.push({ name: "USER", comment: commentInput });

  // Eingabefeld leeren
  document.getElementById(`commentInput-${bookIndex}`).value = "";

  // Daten speichern
  saveData();
}

function saveData() {
  saveToLocalStorage();
}

// Local Storage

function saveToLocalStorage() {
  localStorage.setItem("booksData", JSON.stringify(books));
}

function getFromLocalStorage() {
  let booksData = localStorage.getItem("booksData");
  if (booksData) {
    books = JSON.parse(booksData);
  }
}
