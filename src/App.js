import React from "react";
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';

export default class App extends React.Component {
  render() {
    return (
      <div class="App">
        <h1>Ravenous</h1>
        <SearchBar />
        <BusinessList />
      </div>
    );
  }
}
