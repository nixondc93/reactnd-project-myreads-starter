import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import SearchPage from './SearchPage';
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class BooksApp extends React.Component {
  state = {
    errorOnSearch: false,
    searchResults: null,
    currentlyReadingShelf: null,
    wantToReadShelf: null,
    readShelf: null,
    showSearchPage: true
  }

  getBooks(){
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

  componentDidMount(){
    this.getBooks();
  }

  onSearch = (query) => {
    query = query.trim();
    this.setState({searchResults: null})

    if(!query){
      return;
    }

    BooksAPI.search(query).then((searchResults, errorOnSearch) => {
      if(errorOnSearch){
        console.log('error');
        this.setState({errorOnSearch: true, searchResults: null});
      }
      if(searchResults.error){
        this.setState({errorOnSearch: true, searchResults: null})
      }else{
        searchResults = searchResults.map(searchResult => {
          this.state.currentlyReadingShelf.forEach(ele => {
            if(ele.title === searchResult.title){
              searchResult.shelf = "currentlyReading";
            }
          });
          this.state.wantToReadShelf.forEach(ele => {
            if(ele.title === searchResult.title){
              searchResult.shelf = "wantToRead";
            }
          });
          this.state.readShelf.forEach(ele => {
            if(ele.title === searchResult.title){
              searchResult.shelf = "read";
            }
          });
          return searchResult
        });
        this.setState({searchResults, errorOnSearch: false});
      }
    });
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resBook) => this.getBooks());
  };

  render() {

    return (
      <div className="app">
        <Route  path='/search' render={() => 
          <SearchPage 
            changeShelf={this.changeShelf} 
            onSearch={this.onSearch} 
            searchResults={this.state.searchResults} 
            errorOnSearch={this.state.errorOnSearch}
          />}
        />
          

        <Route exact path='/' render={() => 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf changeShelf={this.changeShelf} shelf={"Currently Reading"}  books={this.state.currentlyReadingShelf}/>
                <Shelf changeShelf={this.changeShelf} shelf={"Want to Read"} books={this.state.wantToReadShelf}/>
                <Shelf changeShelf={this.changeShelf} shelf={"Read"} books={this.state.readShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>


      </div>
    )
  }
}

export default BooksApp
