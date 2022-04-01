const addButton = document.querySelector('#add-btn');
const bookList = document.getElementsByClassName('book-list')[0];
const inputTitle = document.querySelector('.title');
const inputAuthor = document.querySelector('.author');
const alertMessage = document.querySelector('#alert-message');
let theBooks = [];

class BookObject {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  add() {
    function creaateAndAppend(title, author, id) {
      const bookContainer = document.createElement('div');
      const infoContainer = document.createElement('div');
      const titleBook = document.createElement('h5');
      const authorBook = document.createElement('h5');
      const idBook = document.createElement('h5');
      const removeButton = document.createElement('button');

      bookContainer.classList.add('book-container');
      infoContainer.classList.add('book-info');
      titleBook.classList.add('book-title');
      authorBook.classList.add('book-author');
      removeButton.classList.add('remove-btn');

      titleBook.innerHTML = `${title}&nbsp;`;
      authorBook.innerHTML = `by ${author}&nbsp;`;
      idBook.innerHTML = id;
      removeButton.innerHTML = 'Remove';

      idBook.style.display = 'none';

      infoContainer.append(titleBook, authorBook, idBook);
      bookContainer.append(infoContainer, removeButton);
      bookList.append(bookContainer);

      BookObject.remove(removeButton);
    }
    creaateAndAppend(this.title, this.author, this.id);
  }

  static remove(element) {
    function removeBook() {
      theBooks = theBooks.filter((book) => +book.id
      !== +this.parentNode.children[0].children[2].innerHTML);
      this.parentNode.remove();

      theBooks.forEach((book, i) => {
        bookList.children[i].children[0].children[2].innerHTML = i;
        book.id = i;
      });
      localStorage.setItem('booksArray', JSON.stringify(theBooks));
    }

    element.addEventListener('click', removeBook);
  }

  static addBooks() {
    if (
      inputTitle.value !== ''
      && inputAuthor.value !== ''
    ) {
      const newBook = new BookObject(inputTitle.value, inputAuthor.value, theBooks.length);
      newBook.add();
      theBooks.push(newBook);

      localStorage.setItem('booksArray', JSON.stringify(theBooks));

      inputTitle.value = '';
      inputAuthor.value = '';
      alertMessage.style.display = 'none';
    } else {
      alertMessage.textContent = 'Empty field';
      alertMessage.style.display = 'initial';
    }
  }

  static loadBooks() {
    JSON.parse(localStorage.getItem('booksArray')).forEach((book, i) => {
      const newBook = new BookObject(book.title, book.author, i);
      newBook.add();
      theBooks.push(newBook);
    });
  }
}

function highLightMessage() {
  alertMessage.style.transform = 'scale(1.15)';
}

function noHighlightMessage() {
  alertMessage.style.transform = 'scale(1)';
}

addButton.addEventListener('mousedown', highLightMessage);
addButton.addEventListener('mouseup', noHighlightMessage);
addButton.addEventListener('click', BookObject.addBooks);

BookObject.loadBooks();

// Single Page Application
const booksSection = document.getElementById('books');
const addBookSection = document.getElementById('form');
const contactSection = document.getElementById('contact');

const listLink = document.getElementById('list-link');
const addNewLink = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');


function loadContent() {
  if (window.location.hash === '#books-header') {
    booksSection.style.display = 'block';
    addBookSection.style.display = 'none';
    contactSection.style.display = 'none';

    listLink.style.fontWeight = 'bold';
    addNewLink.style.fontWeight = 'normal';
    contactLink.style.fontWeight = 'normal';

  } else if (window.location.hash === '#form') {
    addBookSection.style.display = 'block';
    booksSection.style.display = 'none';
    contactSection.style.display = 'none';
    
    listLink.style.fontWeight = 'normal';
    addNewLink.style.fontWeight = 'bold';
    contactLink.style.fontWeight = 'normal';

  } else if (window.location.hash === '#contact') {
    contactSection.style.display = 'block';
    booksSection.style.display = 'none';
    addBookSection.style.display = 'none';
    
    listLink.style.fontWeight = 'normal';
    addNewLink.style.fontWeight = 'normal';
    contactLink.style.fontWeight = 'bold';
  }
}

window.addEventListener('hashchange', loadContent);
