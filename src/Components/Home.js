import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from './Products';
// import PropTypes from 'prop-types';
// import Cart from './Cart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      inputValue: '',
      searchResult: [],
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
  }

  async handleRequest() {
    const response = await getCategories();
    this.setState({ products: response });
  }

  async handleClick() {
    const { inputValue } = this.state;
    const requestApi = await getProductsFromCategoryAndQuery(undefined, inputValue);
    this.setState({
      searchResult: requestApi.results,
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { products, inputValue, searchResult } = this.state;

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
          <Products searchResult={ searchResult } />
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
            <label htmlFor={ name } data-testid="category" key={ id }>
              <input
                type="radio"
                value={ name }
                name="name"
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
