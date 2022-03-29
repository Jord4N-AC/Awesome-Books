let theBooks = [];

const addButton = document.querySelector('.button');
addButton.addEventListener('click', () => {
  const bookContainer = document.createElement('div');
  const titleBook = document.createElement('h5');
  const authorBook = document.createElement('h5');
  const removeButton = document.createElement('button');
  const breakLine = document.createElement('hr');
  const inputTitle = document.querySelector('.title');
  const inputAuthor = document.querySelector('.author');
  titleBook.innerHTML = inputTitle.value;
  authorBook.innerHTML = inputAuthor.value;
  removeButton.innerHTML = 'Remove';

  bookContainer.append(titleBook, authorBook, removeButton, breakLine);
  const bookList = document.querySelector('.book-list');
  bookList.append(bookContainer);

  theBooks.push({ title: inputTitle.value, author: inputAuthor.value });

  window.localStorage.setItem('booksArray', JSON.stringify(theBooks));

  function removeBook() {
    theBooks = theBooks.filter((book) => book.title !== this.parentNode.childNodes[0].innerHTML);
    localStorage.setItem('booksArray', JSON.stringify(theBooks));
    this.parentNode.remove();
  }

  removeButton.addEventListener('click', removeBook);
});
