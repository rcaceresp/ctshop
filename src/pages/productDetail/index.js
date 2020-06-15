import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import Loader from '../../components/loader';
import ImageGallery from 'react-image-gallery';
import SearchBar from '../../components/searchbar';
import ProductPrice from '../../components/productPrice';
import NumericInput from 'react-numeric-input';
import AddToCartBtn from '../../components/addToCartBtn';

class ProductDetailPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      product: null,
      loading: true,
      qty: 1
    };

    this.increaseQty = this.increaseQty.bind(this);
  }

  async componentDidMount() {
    let {owner = null, product = null } = this.props;
    
    if (owner && product) {
      try {
        let company = await this.props.firebase.db.ref(`/companies/${owner}`).once('value');
        let prd = await this.props.firebase.db.ref(`/products/${owner}/${product}`).once('value');

        company = company.val();
        prd = prd.val();

        company._id = owner;
        prd._id = product;

        prd.images = prd.images.map( image => { return { original: image, thumbnail: image }});

        this.setState({ company, product: prd, loading: false});
      } catch (e) {
        console.log(e);
      }
    }
  }

  increaseQty(qty) {
    this.setState({ qty });
  }

  render() {
    const { company, product, qty} = this.state;

    return (
      <React.Fragment>
        <SearchBar noText={true}/>
        <section className="section">
          <div className="container">
            {this.state.loading && <Loader withMessage={false} />}
            {!this.state.loading && buildPage(company, product, qty, this.increaseQty) }
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const buildPage = (company, product, qty, increaseQty) => (
  <div className="row">
    <div className="columns is-centered">
      <div className="column is-two-fifths">
        <ImageGallery
          items={product.images}
          lazyLoad={true}
          thumbnailPosition="left"
          showFullscreenButton={false}
          showPlayButton={false}
        />
      </div>
      <div className="column is-one-third">
        <small><a href="/">{product.cat}</a> / {product.name}</small>
        <h1 className="title is-3 is-bold has-text-black has-text-weight-bold ">
          {product.name} <br/>
          <span className="tag is-small is-white">Vendido Por: </span><span className="tag is-small is-light"><a href="/">{company.company}</a></span>
        </h1>
        <hr/>
        <p>{product.desc}</p>
        <hr/>
        <h5 className="title is-5 has-text-weight-bold has-text-grey">Precio:</h5>
        <ProductPrice price={product.price} discount={ product.oferta ? product.oferta.porcentaje : null } />
        <hr/>
        <p className="has-text-centered">
          <small><b>Cantidad:</b></small> <br/>
          <NumericInput className="input" step={1} min={1} max={Number(product.stock)} value={qty} size={3} onChange={ (van) => increaseQty(van)}/>
        </p>
        <br/><br/>
        <AddToCartBtn vendor={company} product={product} qty={qty} stock={product.stock} />
      </div>
    </div>
  </div>
);

const ProductDetailPage = withFirebase(ProductDetailPageBase);

export default ProductDetailPage;