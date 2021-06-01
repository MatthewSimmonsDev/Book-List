class Book {
  constructor(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

class UI {
  addBookToList(book){
   // Add book to list
    UI.prototype.addBookToList = function(book){
   const list = document.getElementById('book-list');
   // Create tr element
    const row = document.createElement('tr');
   // Insert cols
   row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}
    }
  showAlert(message, className){
    UI.prototype.showAlert = function(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add Text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      // Insert alert
      container.insertBefore(div, form);
      // Timeout after 3 seconds
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    
    }
  }
  deleteBook(target){
    // Delete Book
    UI.prototype.deleteBook = function (target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
     }
  } 
  }
  clearFields(){
    UI.prototype.clearFields = function(){
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('pages').value = '';
    }
  }
}

// Local Storage Class
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      // Add book to UI
      ui.addBookToList(book);
    })
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(pages){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.pages === pages){
        books.splice(index, 1);
      }
    })

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Dom load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        pages = document.getElementById('pages').value

  const book = new Book(title, author, pages);

  // Instantiate UI
  const ui = new UI();

  
  // Validate
  if(title === '' || author === '' || pages === ''){
    //Error Alert
    ui.showAlert('Please fill in all fields', 'error');
  } else{
    // Add Book to list
    ui.addBookToList(book);
    // Add to local storage
    Store.addBook(book);
    // Show success
    ui.showAlert('Book Added', 'success');    
    // Clear Fields
    ui.clearFields();
    
  }
  
  
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
  // Instantiate UI
  const ui = new UI();
  e.preventDefault();
  // Delete book
  ui.deleteBook(e.target);
  
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // Show alert
  ui.showAlert('Book Removed', 'success');
})