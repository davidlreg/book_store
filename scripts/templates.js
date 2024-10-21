function booksTemplate(i) {
  return `
    <div class="book">
      <div id="bookTitle-${i}">
        <h2>${books[i].name}</h2>
      </div>
      <div class="seperator"></div>
      <img class="bookImg" src="img/book-1868068_1280.jpg" />
      <div class="seperator"></div>
      <div class="priceAndLikes">
        <div class="bookPrice" id="bookPrice-${i}">
          <p id="price">${books[i].price.toFixed(2)}</p>€
        </div>
        <div class="bookLikes" id="bookLikes-${i}">
          <p id="likes-${i}">${books[i].likes}</p>
          <span id="likeHeart-${i}" class="material-symbols-outlined hearth">favorite</span>
        </div>
      </div>
      <table class="bookInfo">
        <tr id="author-${i}">
          <td>Author:</td>
          <td>${books[i].author}</td>
        </tr>
        <tr id="year-${i}">
          <td>Erscheinungsjahr:</td>
          <td>${books[i].publishedYear}</td>
        </tr>
        <tr id="genre-${i}">
          <td>Genre:</td>
          <td>${books[i].genre}</td>
        </tr>
      </table>
      <div class="seperator"></div>
      <div class="commentSectionWrapper">
        <h3 class="commentSectionHeadline">Kommentare:</h3>
        <div class="commentSection" id="commentSection-${i}">
        </div>
        <div class="commentSectionInput">
          <input type="text" class="commentInput" id="commentInput-${i}" placeholder="Schreibe dein Kommentar ...">
          <input class="commentButton" type="submit" value="Kommentieren" onclick="addComment(${i})">
        </div>
      </div>
    </div> 
  `;
}
