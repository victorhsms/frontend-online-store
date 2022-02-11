import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const {
      cartList,
      handleRemoveButton,
      handleIncreaseButton,
      handleDecreaseButton } = this.props;
    if (cartList.length === 0) {
      return (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>);
    }
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
              <button
                type="button"
                id={ id }
                name="remove-button"
                onClick={ handleRemoveButton }
              >
                X
              </button>
              <img src={ thumbnail } alt={ title } width="200" />
              <p>{`R$ ${price}`}</p>
              <p data-testid="shopping-cart-product-quantity">{ qtd }</p>
              <button
                id={ id }
                type="button"
                name="decrease-button"
                data-testid="product-decrease-quantity"
                onClick={ handleDecreaseButton }
              >
                Diminuir
              </button>
              <button
                id={ id }
                type="button"
                name="increase-button"
                data-testid="product-increase-quantity"
                onClick={ handleIncreaseButton }
              >
                Aumentar
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf.isRequired,
  handleRemoveButton: PropTypes.func.isRequired,
  handleIncreaseButton: PropTypes.func.isRequired,
  handleDecreaseButton: PropTypes.func.isRequired,
};

export default Cart;
