import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Products extends Component {
  render() {
    const { searchResult, handleButton } = this.props;
    if (searchResult.length === 0) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
    return (
      <div>
        {searchResult.map(({ id, title, thumbnail, price, shipping }) => (
          <div
            key={ id }
            data-testid="product"
          >
            <Link
              to={ `/product/${id}` }
              data-testid="product-detail-link"
            >
              <h2>{ title }</h2>
              <img src={ thumbnail } alt={ title } width="200" />
              <p>{`R$ ${price}`}</p>
            </Link>
            { shipping.free_shipping ? (
              <img
                data-testid="free-shipping"
                src="https://cdn.awsli.com.br/511/511886/arquivos/frete-gratis-1.png"
                alt="Frete grátis"
                width="50"
              />
            ) : (
              false
            ) }
            <button
              name={ price }
              id={ id }
              title={ title }
              className={ thumbnail }
              onClick={ handleButton }
              type="button"
              data-testid="product-add-to-cart"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    );
  }
}

Products.propTypes = {
  searchResult: PropTypes.arrayOf.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default Products;
