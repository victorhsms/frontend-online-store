import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Cart from './Cart';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    this.handleRequest();
  }

  async handleRequest() {
    const response = await getCategories();
    this.setState({ products: response });
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <form>
          <input className="initialInput" />
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
