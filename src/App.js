import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';
import { getCartBack, saveCart } from './services/SaveCart';

// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartList: [],
      itemCount: 0,
      emailValue: '',
      ratingCheck: '',
      descriptionValue: '',
      buttonAvaliability: true,
      allRating: [],
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleRemoveButton = this.handleRemoveButton.bind(this);
    this.handleIncreaseButton = this.handleIncreaseButton.bind(this);
    this.handleDecreaseButton = this.handleDecreaseButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonManager = this.buttonManager.bind(this);
    this.saveRating = this.saveRating.bind(this);
    this.countProducts = this.countProducts.bind(this);
  }

  componentDidMount() {
    const retrieved = getCartBack();
    this.setState({ cartList: retrieved }, () => this.countProducts());
    this.setState({
      allRating: JSON.parse(localStorage.getItem('allratings')),
    });
  }

  componentDidUpdate() {
    this.buttonManager();
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
      }, () => this.countProducts());
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
    }, () => this.countProducts());
  }

  handleRemoveButton({ target }) {
    const { id } = target;
    const { cartList } = this.state;
    const old = [...cartList];
    const search = cartList.findIndex((index) => (index.id === id));
    old.splice(search, 1);
    this.setState({
      cartList: old,
    }, () => this.countProducts());
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
      }, () => this.countProducts());
    } else {
      copy[tentative].qtd += 1;
      this.setState({
        cartList: copy,
      }, () => this.countProducts());
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonManager() {
    const { emailValue, ratingCheck, buttonAvaliability } = this.state;
    const conditions = [
      emailValue.length > 0,
      ratingCheck !== '',
    ];
    const allConditions = conditions.every((condition) => condition);
    if (allConditions && buttonAvaliability) {
      this.setState({
        buttonAvaliability: false,
      });
    } else if (!allConditions && !buttonAvaliability) {
      this.setState({
        buttonAvaliability: true,
      });
    }
  }

  saveRating(event) {
    event.preventDefault();
    const { emailValue, ratingCheck, descriptionValue } = this.state;
    let allRatings;
    const storage = JSON.parse(localStorage.getItem('allratings'));
    if (storage === null) {
      allRatings = [];
    } else {
      allRatings = storage;
    }
    const rating = {
      id: event.target.name,
      email: emailValue,
      stars: ratingCheck,
      description: descriptionValue,
    };
    allRatings.push(rating);
    localStorage.setItem('allratings', JSON.stringify(allRatings));
    this.setState({
      emailValue: '',
      ratingCheck: '',
      descriptionValue: '',
      allRating: allRatings,
    });
  }

  countProducts() {
    const { cartList } = this.state;
    let count = 0;
    cartList.forEach((item) => {
      count += Number(item.qtd);
    });
    this.setState({ itemCount: count });
    saveCart(cartList);
  }

  render() {
    const {
      cartList,
      itemCount,
      emailValue,
      ratingCheck,
      descriptionValue,
      buttonAvaliability,
      allRating,
    } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Home
              { ...props }
              itemCount={ itemCount }
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
              itemCount={ itemCount }
              handleButton={ this.handleButton }
              emailValue={ emailValue }
              ratingCheck={ ratingCheck }
              descriptionValue={ descriptionValue }
              buttonAvaliability={ buttonAvaliability }
              handleChange={ this.handleChange }
              saveRating={ this.saveRating }
              allRatings={ allRating }
            />
          ) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
