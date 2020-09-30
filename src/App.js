import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import SavedPage from './components/SavedPage';
import ErrorBoundary from './components/errors/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
      <ErrorBoundary>
        <Route exact path={"/"} component={SearchPage} />
        <Route exact path={"/savedbooks"} component={SavedPage} />
      </ErrorBoundary>
    </div>
    </Router>
    
  );
}

export default App;
