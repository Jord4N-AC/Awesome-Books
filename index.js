const addButton = document.querySelector('.button');
const bookList = document.getElementsByClassName('book-list')[0];
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const alertMessage = document.querySelector('#alert-message');
let theBooks = [];


function removeBook() {
  theBooks = theBooks.filter((book) => +book.id !== +this.parentNode.childNodes[2].innerHTML);
  this.parentNode.remove();

  theBooks.forEach((book, i) => {
    bookList.children[i].children[2].innerHTML = i;
    book.id = i;
  });
  localStorage.setItem('booksArray', JSON.stringify(theBooks));
}

function creaateAndAppend(title, author, id) {
  const bookContainer = document.createElement('div');
  const titleBook = document.createElement('h5');
  const authorBook = document.createElement('h5');
  const idBook = document.createElement('h5');
  const removeButton = document.createElement('button');
  const breakLine = document.createElement('hr');

  titleBook.innerHTML = title;
  authorBook.innerHTML = author;
  idBook.innerHTML = id;
  removeButton.innerHTML = 'Remove';

  // idBook.style.display = 'none';

  bookContainer.append(titleBook, authorBook, idBook, removeButton, breakLine);
  bookList.append(bookContainer);

  removeButton.addEventListener('click', removeBook);
}


function addBooks() {
  if (
    inputTitle.value !== ''
    && inputAuthor.value !== ''
  ) {
    creaateAndAppend(inputTitle.value, inputAuthor.value, theBooks.length);
    const bookObj = { title: inputTitle.value, author: inputAuthor.value, id: theBooks.length };
    theBooks.push(bookObj);
    localStorage.setItem('booksArray', JSON.stringify(theBooks));

    inputTitle.value = '';
    inputAuthor.value = '';
    alertMessage.style.display = 'none';
  } else {
    alertMessage.textContent = 'Empty field';
    alertMessage.style.display = 'initial';
  }
}



function loadBooks() {
  theBooks = JSON.parse(localStorage.getItem('booksArray'));
  theBooks.forEach((book, i) => {
    creaateAndAppend(book.title, book.author, i);
  });
}

function highLightMessage() {
  alertMessage.style.transform = 'scale(1.15)';
}

function noHighlightMessage() {
  alertMessage.style.transform = 'scale(1)';
}

addButton.addEventListener('mousedown', highLightMessage);
addButton.addEventListener('mouseup', noHighlightMessage);
addButton.addEventListener('click', addBooks);
loadBooks();

