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
  booksComments();
  booksLikes();
}

function booksComments() {
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let bookCommentsSection = document.getElementById(`commentSection-${i}`);

    bookCommentsSection.innerHTML = "";

    for (let j = 0; j < book.comments.length; j++) {
      bookCommentsSection.innerHTML += `<p>[${book.comments[j].name}] :</p><p><i>${book.comments[j].comment}</i></p>`;
    }
  }
}

function booksLikes() {
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let likeHeart = document.getElementById(`likeHeart-${i}`);
    let likesCount = document.getElementById(`likes-${i}`);

    if (book.liked) {
      likeHeart.classList.add("liked");
    } else {
      likeHeart.classList.remove("liked");
    }

    likeHeart.addEventListener("click", function () {
      toggleLike(i);
    });

    likesCount.innerHTML = book.likes;
  }
}

function toggleLike(bookIndex) {
  let book = books[bookIndex];
  let likeHeart = document.getElementById(`likeHeart-${bookIndex}`);
  let likesCount = document.getElementById(`likes-${bookIndex}`);

  if (book.liked) {
    book.likes--;
    book.liked = false;
    likeHeart.classList.remove("liked");
  } else {
    book.likes++;
    book.liked = true;
    likeHeart.classList.add("liked");
  }

  likesCount.innerHTML = book.likes;

  saveData();
}

function addComment(bookIndex) {
  let commentInput = document.getElementById(`commentInput-${bookIndex}`).value;
  let commentRef = document.getElementById(`commentSection-${bookIndex}`);

  if (commentInput == "") {
    alert("Bitte Kommentar einfügen!");
    return;
  }

  commentRef.innerHTML += `<p><b>[USER] :</b></p><p><i>${commentInput}</i></p>`;

  books[bookIndex].comments.push({ name: "USER", comment: commentInput });

  document.getElementById(`commentInput-${bookIndex}`).value = "";

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
