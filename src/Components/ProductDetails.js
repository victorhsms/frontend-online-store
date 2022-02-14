import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromProductId } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      thumbnail: '',
      price: '',
      attributes: [],
    };

    this.searchProduct = this.searchProduct.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.searchProduct(id);
  }

  async searchProduct(id) {
    const productDetails = await getProductsFromProductId(id);
    const { title, thumbnail, price, attributes } = productDetails;

    this.setState({
      title,
      thumbnail,
      price,
      attributes,
    });
  }

  render() {
    const { handleButton, itemCount } = this.props;
    const { id, title, thumbnail, price, attributes } = this.state;
    return (
      <div>
        <div>
          <Link to="/cart" data-testid="shopping-cart-button">
            <li>CART</li>
          </Link>
          <p data-testid="shopping-cart-size">{ itemCount }</p>
        </div>
        <h2>
          <span data-testid="product-detail-name">{ title }</span>
          { ` - R$ ${price}` }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <div>
          <h3>Especificações Técnicas:</h3>
          <ul>
            { attributes.map((attribute) => (
              <li key={ attribute.id }>
                { `${attribute.name}: ${attribute.value_name}` }
              </li>))}
          </ul>
        </div>
        <button
          name={ price }
          id={ id }
          title={ title }
          className={ thumbnail }
          onClick={ handleButton }
          data-testid="product-detail-add-to-cart"
          type="submit"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
};

export default ProductDetails;
