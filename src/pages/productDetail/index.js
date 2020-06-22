import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import Loader from '../../components/loader';
import ImageGallery from 'react-image-gallery';
import SearchBar from '../../components/searchbar';
import ProductPrice from '../../components/productPrice';
import NumericInput from 'react-numeric-input';
import AddToCartBtn from '../../components/addToCartBtn';
import _array from 'lodash/array';
import { Link } from 'react-router-dom';

class ProductDetailPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      product: null,
      loading: true,
      qty: 1,
      stock: 0,
      hasSizes: false,
      avaAmount: 0,
      sizeSelected: false,
      error: false
    };

    this.increaseQty = this.increaseQty.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  async componentDidMount() {
    let {owner = null, product = null } = this.props;
    
    if (owner && product) {
      try {
        let company = await this.props.firebase.db.ref(`/companies/${owner}`).once('value');
        let prd = await this.props.firebase.db.ref(`/products/${owner}/${product}`).once('value');
        let hasSizes = false;
        let avaAmount = 0;
        let sizeSelected = false;

        company = company.val();
        prd = prd.val();

        company._id = owner;
        prd._id = product;

        prd.images = prd.images.map( image => { return { original: image, thumbnail: image }});
        hasSizes = Array.isArray(prd.stock);
        avaAmount = hasSizes ? prd.stock[0].cantidad : prd.stock;
        sizeSelected = hasSizes ? prd.stock[0].talla : sizeSelected;

        this.setState({ company, product: prd, loading: false, hasSizes, avaAmount, sizeSelected });
      } catch (e) {
        console.log(e);

        this.setState({ owner, product, loading: false, error: true });
      }
    }
  }

  setSize(size) {
    const stock = this.state.product.stock;
    const findSize = _array.findIndex(stock, item => item.talla === size);
    
    this.setState({ sizeSelected: size, avaAmount: stock[findSize].cantidad, qty: 1 });

  }

  increaseQty(qty) {
    this.setState({ qty });
  }

  render() {
    const { company, product, qty, hasSizes, avaAmount, sizeSelected} = this.state;

    return (
      <React.Fragment>
        <SearchBar noText={true}/>
        <section className="section">
          <div className="container">
            {this.state.loading && <Loader withMessage={false} />}
            {!this.state.loading && buildPage(company, product, qty, this.increaseQty, hasSizes, avaAmount, this.setSize, sizeSelected) }
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const buildPage = (company, product, qty, increaseQty, hasSizes= false, avaAmount = 0, setSize, sizeSelected = false) => (
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
          <span className="tag is-small is-white">Vendido Por: </span><span className="tag is-small is-light">
            <Link to={`/tienda/${company._id}`}>{company.company}</Link>
            </span>
        </h1>
        <hr/>
        <p>{product.desc}</p>
        <hr/>
        {hasSizes && <><h5 className="title is-5 has-text-weight-bold has-text-grey">Tallas disponibles:</h5>
        <p className="has-text-centered"><div className="select is-rounded is-centered is-danger">
          <select onChange={ e => setSize(e.target.value)}>
            {product.stock.map( item => <option value={item.talla}>{item.talla}</option>)}
          </select>
        </div></p>
        <hr/></>}
        <h5 className="title is-5 has-text-weight-bold has-text-grey">Precio:</h5>
        <ProductPrice price={product.price} discount={ product.descuento ? product.descuento.porcentaje : null } />
        <hr/>
        <p className="has-text-centered">
          <small><b>Cantidad Disponible: {avaAmount}</b></small> <br/>
          <NumericInput className="input" step={1} min={1} max={Number(avaAmount)} value={qty} size={3} onChange={ (van) => increaseQty(van)}/>
        </p>
        <br/><br/>
        <AddToCartBtn vendor={company} product={product} qty={qty} sizeSelected={sizeSelected} />
      </div>
    </div>
  </div>
);

const ProductDetailPage = withFirebase(ProductDetailPageBase);

export default ProductDetailPage;