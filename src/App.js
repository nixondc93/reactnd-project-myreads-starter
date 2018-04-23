import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import SearchPage from './SearchPage';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReadingShelf: null,
    wantToReadShelf: null,
    readShelf: null,
    showSearchPage: false
  }

  componentDidMount(){
    let currentlyReadingShelf = [], wantToReadShelf = [], readShelf = []; 
    BooksAPI.getAll().then((books) => {
      books.forEach(book => {
        switch(book.shelf){
          case "currentlyReading":
            currentlyReadingShelf.push(book);
            break;
          case "wantToRead":
            wantToReadShelf.push(book);
            break;
          case "read":
            readShelf.push(book);
            break;
        }        
      });

      this.setState({currentlyReadingShelf, wantToReadShelf, readShelf})
    });
  }

  onsearch(){

  }

  changeShelf(shelf, book){

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={this.state.currentlyReadingShelf}/>
                <Shelf books={this.state.wantToReadShelf}/>
                <Shelf books={this.state.readShelf}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
