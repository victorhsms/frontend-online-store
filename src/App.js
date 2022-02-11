import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';

// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
    };
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton({ target }) {
    const { cartList } = this.state;
    const obj = {
      id: target.id,
      title: target.title,
      price: target.name,
      thumbnail: target.className,
      qtd: 1,
    };
    this.setState({
      cartList: [...cartList, obj],
    });
  }

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Home
              { ...props }
              cartList={ cartList }
              handleButton={ this.handleButton }
            />
          ) }
        />
        <Route
          exact
          path="/cart"
          render={ (props) => (
            <Cart
              { ...props }
              cartList={ cartList }
              handleButton={ this.handleButton }
            />
          ) }
        />
        <Route
          exact
          path="/product/:id"
          render={ (props) => (
            <ProductDetails
              { ...props }
              cartList={ cartList }
              handleButton={ this.handleButton }
            />
          ) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
