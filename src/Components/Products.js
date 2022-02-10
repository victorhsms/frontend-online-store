import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Products extends Component {
  render() {
    const { searchResult, handleButton } = this.props;
    if (searchResult.length === 0) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
    return (
      <div>
        {searchResult.map((products) => {
          const { id, title, thumbnail, price } = products;
          return (
            <div
              key={ id }
              data-testid="product"
            >
              <h2>{ title }</h2>
              <img src={ thumbnail } alt={ title } width="200" />
              <p>{`R$ ${price}`}</p>
              <button
                id={ id }
                type="button"
                data-testid="product-add-to-cart"
                onClick={ handleButton }
              >
                Comprar
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

Products.propTypes = {
  searchResult: PropTypes.arrayOf.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default Products;
