import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Products extends Component {
  render() {
    const { searchResult } = this.props;
    if (searchResult.length === 0) {
      return (<p>Nenhum produto foi encontrado</p>);
    }
    return (
      <div>
        {searchResult.map((products) => {
          const { id, title, thumbnail, price } = products;
          return (
            <Link
              to={ `/product/${id}` }
              data-testid="product-detail-link"
              key={ id }
            >
              <div
                data-testid="product"
              >
                <h2>{ title }</h2>
                <img src={ thumbnail } alt={ title } width="200" />
                <p>{`R$ ${price}`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

Products.propTypes = {
  searchResult: PropTypes.arrayOf.isRequired,
};

export default Products;
