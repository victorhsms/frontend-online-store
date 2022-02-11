import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { cartList } = this.props;
    return (
      <div>
        { cartList.map((element) => {
          const { id, title, thumbnail, price, qtd } = element;
          return (
            <div
              key={ id }
              data-testid="shopping-cart-product-name"
            >
              <h2>{ title }</h2>
              <img src={ thumbnail } alt={ title } width="200" />
              <p>{`R$ ${price}`}</p>
              <p data-testid="shopping-cart-product-quantity">{ qtd }</p>
            </div>
          );
        })}
      </div>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf.isRequired,

};

export default Cart;
