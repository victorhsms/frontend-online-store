import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Cart from './Cart';

class Home extends Component {
  render() {
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
      </div>
    );
  }
}

Home.propTypes = {

};

export default Home;
