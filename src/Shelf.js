import React from 'react';

const Shelf = props => {

  
  if(props.books === null){
    return (<div></div>);    
  }

  const stockImage = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Question_book-4.svg';



  const bookListItems = props.books.map(book => (
    
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `url(${stockImage})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => {props.changeShelf(book, e.target.value); book.shelf = e.target.value}} value={!book.shelf ? "none" : book.shelf}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    </li>
  ));

  return (
  <div className="bookshelf">
  <h2 className="bookshelf-title">{props.shelf}</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
      {bookListItems}
    </ol>
  </div>
  </div>);
};

export default Shelf;