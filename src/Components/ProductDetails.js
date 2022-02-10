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
    console.log(attributes);
  }

  render() {
    const { title, thumbnail, price, attributes } = this.state;
    return (
      <div>
        <div>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <li>CART</li>
          </Link>
        </div>
        <h2>
          <spam
            data-testid="product-detail-name"
          >
            { title }
          </spam>
          { ` - R$ ${price}` }
        </h2>
        <img src={ thumbnail } alt={ title } />
        <div>
          <h3>Especificações Técnicas:</h3>
          <ul>
            {attributes.map((attribute) => {
              const { id, name } = attribute;
              return (
                <li
                  key={ id }
                >
                  { `${name}: ${attribute.value_name}` }
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductDetails;