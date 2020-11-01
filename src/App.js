import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import SavedPage from './components/SavedPage';
import ErrorBoundary from './components/errors/ErrorBoundary';
import BookDetails from './components/BookDetails';

function App() {

 
  return (
    <Router>
      <div className="App">
      <NavBar />
      <ErrorBoundary>
        <Route exact path={["/", "/search"]}>
          <SearchPage />
        </Route>
        <Route exact path={"/savedbooks"}>
          <SavedPage />
        </Route>
        <Route path={"/book/:book"}>
          <BookDetails />
        </Route>
      </ErrorBoundary>
    </div>
    </Router>
    
  );
}

export default App;

