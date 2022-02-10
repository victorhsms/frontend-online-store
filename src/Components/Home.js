import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from './Products';
// import PropTypes from 'prop-types';
// import Cart from './Cart';
import { getCategories,
  getProductsFromCategoryAndQuery,
  getProductsFromCategoryId,
  getProductsFromQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      inputValue: '',
      searchResult: [],
      cartList: [],
      isCategorySelected: false,
      categoryId: '',
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClickCategory = this.handleClickCategory.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
  }

  handleButton({ target }) {
    const { cartList } = this.state;
    this.setState({
      cartList: [...cartList, target.id],
    });
  }

  async handleRequest() {
    const response = await getCategories();
    this.setState({ products: response });
  }

  async handleClick() {
    const { inputValue, isCategorySelected, categoryId } = this.state;
    let requestApi;
    if (isCategorySelected) {
      requestApi = await getProductsFromCategoryAndQuery(categoryId, inputValue);
    } else {
      requestApi = await getProductsFromQuery(inputValue);
    }
    this.setState({
      searchResult: requestApi.results,
    });
  }

  async handleClickCategory({ target }) {
    // const { categoryId } = this.state;
    const requestCategoryApi = await getProductsFromCategoryId(target.id);
    this.setState({
      searchResult: requestCategoryApi.results,
      isCategorySelected: true,
      categoryId: target.id,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { products, inputValue, searchResult, cartList } = this.state;
    return (
      <div>
        <form>
          <input
            className="initialInput"
            data-testid="query-input"
            name="inputValue"
            value={ inputValue }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
          <Products
            searchResult={ searchResult }
            cartList={ cartList }
            handleButton={ this.handleButton }
          />
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <div>
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
            >
              <li>CART</li>

            </Link>
          </div>
        </form>
        <fieldset>
          { products.map(({ id, name }) => (
            <label htmlFor={ id } data-testid="category" key={ id }>
              <input
                type="radio"
                value={ name }
                name="name"
                onClick={ this.handleClickCategory }
                id={ id }
              />
              { name }
            </label>
          )) }
        </fieldset>
      </div>
    );
  }
}

Home.propTypes = {

};

export default Home;
