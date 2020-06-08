import React from 'react';
import { withFirebase } from '../../vendor/firebase';
import Loader from '../../components/loader';
import ImageGallery from 'react-image-gallery';
import SearchBar from '../../components/searchbar';
import ProductPrice from '../../components/productPrice';
import NumericInput from 'react-numeric-input';


class ProductDetailPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      product: null,
      loading: true
    };
  }

  async componentDidMount() {
    let {owner = null, product = null } = this.props;

    console.log({owner, product})
    
    if (owner && product) {
      try {
        let company = await this.props.firebase.db.ref(`/companies/${owner}`).once('value');
        let prd = await this.props.firebase.db.ref(`/products/${owner}/${product}`).once('value');

        company = company.val();
        prd = prd.val();

        prd.images = prd.images.map( image => { return { original: image, thumbnail: image }});

        this.setState({ company, product: prd, loading: false});
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const { company, product} = this.state;

    return (
      <React.Fragment>
        <SearchBar noText={true}/>
        <section className="section">
          <div className="container">
            {this.state.loading && <Loader withMessage={false} />}
            {!this.state.loading && buildPage(company, product)}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const buildPage = (company, product) => (
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
        <small><a href="">{product.cat}</a> / {product.name}</small>
        <h1 className="title is-3 is-bold has-text-black has-text-weight-bold ">
          {product.name} <br/>
          <span className="tag is-small is-white">Vendido Por: </span><span className="tag is-small is-light"><a href="">{company.company}</a></span>
        </h1>
        <hr/>
        <p>{product.desc}</p>
        <hr/>
        <h5 className="title is-5 has-text-weight-bold has-text-grey">Precio:</h5>
        <ProductPrice price={product.price} discount={ product.oferta ? product.oferta.porcentaje : null } />
        <hr/>
        <p className="has-text-centered">
          <small>Elige la cantidad:</small> <br/>
          <NumericInput className="input" step={1} min={1} value={1} size="small"/>
        </p>
        <br/><br/>
        <div className="buttons is-centered">
          <button className="button is-danger is-small has-text-weight-bold">
            <span className="icon"><i className="fa fa-cart-plus"/></span> <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetailPage = withFirebase(ProductDetailPageBase);

export default ProductDetailPage;