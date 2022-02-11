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
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleIncreaseButton = this.handleIncreaseButton.bind(this);
    this.handleDecreaseButton = this.handleDecreaseButton.bind(this);
  }

  handleDecreaseButton({ target }) {
    const { id } = target;
    const { cartList } = this.state;
    const copy = [...cartList];
    const search = cartList.findIndex((index) => (index.id === id));
    if (copy[search].qtd > 1) {
      copy[search].qtd -= 1;
      this.setState({
        cartList: copy,
      });
    } else {
      this.handleRemoveButton({ target });
    }
  }

  handleIncreaseButton({ target }) {
    const { id } = target;
    const { cartList } = this.state;
    const copy = [...cartList];
    const search = cartList.findIndex((index) => (index.id === id));
    copy[search].qtd += 1;
    this.setState({
      cartList: copy,
    });
  }

  handleRemoveButton({ target }) {
    const { id } = target;
    const { cartList } = this.state;
    const old = [...cartList];
    const search = cartList.findIndex((index) => (index.id === id));
    old.splice(search, 1);
    this.setState({
      cartList: old,
    });
  }

  handleButton({ target }) {
    const { cartList } = this.state;
    const TENTATIVE_NUMBER = -1;
    const obj = {
      id: target.id,
      title: target.title,
      price: target.name,
      thumbnail: target.className,
      qtd: 1,
    };

    const copy = [...cartList];
    const tentative = cartList.findIndex((element) => (element.id === obj.id));
    if (tentative === TENTATIVE_NUMBER) {
      this.setState({
        cartList: [...cartList, obj],
      }); console.log(cartList);
    } else {
      copy[tentative].qtd += 1;
      this.setState({
        cartList: copy,
      });
    }
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
          render={ (props) => (<Cart
            { ...props }
            cartList={ cartList }
            handleButton={ this.handleButton }
            handleRemoveButton={ this.handleRemoveButton }
            handleIncreaseButton={ this.handleIncreaseButton }
            handleDecreaseButton={ this.handleDecreaseButton }
          />) }
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
