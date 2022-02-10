import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';

// import './App.css';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ ProductDetails } />
      </BrowserRouter>

    );
  }
}

export default App;
