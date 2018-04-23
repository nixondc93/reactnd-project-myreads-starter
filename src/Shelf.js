import React from 'react';

const Shelf = props => {

  if(!props.books){
    return (<div>Loading...</div>);
  }

  const bookListItems = props.books.map(book => (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option defaultValue value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map(author => (
          <div className="book-authors">{author}</div>
        ))}
      </div>
    </li>
  ));

  return (
  <div className="bookshelf">
  <h2 className="bookshelf-title">Currently Reading</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
      {bookListItems}
    </ol>
  </div>
  </div>);
};

export default Shelf;