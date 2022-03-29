let theBooks = [];

const addButton = document.querySelector('.button');
addButton.addEventListener('click', () => {
  const bookContainer = document.createElement('div');
  const titleBook = document.createElement('h5');
  const authorBook = document.createElement('h5');
  const idBook = document.createElement('h5');
  const removeButton = document.createElement('button');
  const breakLine = document.createElement('hr');
  const inputTitle = document.querySelector('.title');
  const inputAuthor = document.querySelector('.author');
  titleBook.innerHTML = inputTitle.value;
  authorBook.innerHTML = inputAuthor.value;
  idBook.innerHTML = theBooks.length;
  removeButton.innerHTML = 'Remove';


  // idBook.style.display = 'none';

  bookContainer.append(titleBook, authorBook, idBook, removeButton, breakLine);
  const bookList = document.querySelector('.book-list');
  bookList.append(bookContainer);

  theBooks.push({ title: inputTitle.value, author: inputAuthor.value, id: theBooks.length });

  window.localStorage.setItem('booksArray', JSON.stringify(theBooks));

  function removeBook() {
    theBooks = theBooks.filter((book) => +book.id !== +this.parentNode.childNodes[2].innerHTML);
    this.parentNode.remove();

    theBooks.forEach((book, i) => {
      bookList.children[i].children[2].innerHTML = i;
      book.id = i;
    });

    localStorage.setItem('booksArray', JSON.stringify(theBooks));
  }

  removeButton.addEventListener('click', removeBook);

  // inputTitle.value = '';
  // inputAuthor.value = '';
});


function a() {
  if(theBooks.length !== 0) {
    console.log(typeof theBooks[0].id);
  }
}
window.addEventListener('click', a);
