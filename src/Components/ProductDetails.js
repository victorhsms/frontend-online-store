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
      idProduct: '',
    };

    this.searchProduct = this.searchProduct.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({
      idProduct: id,
    });
    this.searchProduct(id);
  }

  async searchProduct(id) {
    const productDetails = await getProductsFromProductId(id);
    const { title, thumbnail, price, attributes, shipping } = productDetails;

    this.setState({
      title,
      thumbnail,
      price,
      attributes,
      shipping: shipping.free_shipping,
    });
  }

  render() {
    const {
      handleButton,
      itemCount,
      emailValue,
      ratingCheck,
      descriptionValue,
      buttonAvaliability,
      handleChange,
      saveRating,
      allRatings,
    } = this.props;
    const {
      id,
      idProduct,
      title,
      thumbnail,
      price,
      attributes,
      shipping,
    } = this.state;
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
            <li data-testid="free-shipping">
              {`Frete gratis: ${shipping ? 'Sim' : 'Não'}`}
            </li>
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
        <h3>Avaliações</h3>
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="Digite seu email"
            name="emailValue"
            value={ emailValue }
            onChange={ handleChange }
          />
          <label
            htmlFor="ratings"
          >
            Estelas:
            <input
              type="radio"
              id="ratings"
              data-testid="1-rating"
              name="ratingCheck"
              value="1"
              checked={ ratingCheck === '1' }
              onChange={ handleChange }
            />
            <input
              type="radio"
              id="ratings"
              data-testid="2-rating"
              name="ratingCheck"
              value="2"
              checked={ ratingCheck === '2' }
              onChange={ handleChange }
            />
            <input
              type="radio"
              id="ratings"
              data-testid="3-rating"
              name="ratingCheck"
              value="3"
              checked={ ratingCheck === '3' }
              onChange={ handleChange }
            />
            <input
              type="radio"
              id="ratings"
              data-testid="4-rating"
              name="ratingCheck"
              value="4"
              checked={ ratingCheck === '4' }
              onChange={ handleChange }
            />
            <input
              type="radio"
              id="ratings"
              data-testid="5-rating"
              name="ratingCheck"
              value="5"
              checked={ ratingCheck === '5' }
              onChange={ handleChange }
            />
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="informe uma descrição"
            name="descriptionValue"
            value={ descriptionValue }
            onChange={ handleChange }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            name={ idProduct }
            disabled={ buttonAvaliability }
            onClick={ saveRating }
          >
            Enviar
          </button>
        </form>
        {allRatings === null ? null
          : allRatings.map((rating) => {
            const { email, stars, description } = rating;
            return (
              <div key={ rating.id }>
                <h4>{ email }</h4>
                <p>{ `${stars} Estrelas` }</p>
                <p>{ description }</p>
              </div>
            );
          })}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  emailValue: PropTypes.string.isRequired,
  ratingCheck: PropTypes.string.isRequired,
  descriptionValue: PropTypes.string.isRequired,
  buttonAvaliability: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveRating: PropTypes.func.isRequired,
  allRatings: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails;
