import React from 'react'
import SearchBar from '../../components/searchbar';

// Custom Components
import Ofertas from '../../components/home/ofertas';
import Stores from '../../components/home/afiliados';

const Home = props => {
  return(
    <React.Fragment>
      <SearchBar/>
      <section className="section">
      <div className="container has-text-centered">
        <img src="/banner.jpeg" style={{maxWidth: 800}}/> 
      </div>
      </section>
      <Ofertas/>
      <Stores/>
      <hr/>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="columns is-centered">
              <div className="column is-three-fifths">
                <h1 className="title is-3 has-text-centered"><b>¿C&oacute;mo funciona Catrachos Shop?</b></h1>
                <hr/>
                <p><a href="/"><b>Catrachos Shop</b></a> es una plataforma de tiendas online para micro, peque&ntilde;a y medianas empresas donde nuestros afiliados ofrecen sus productos a trav&eacute;s de la herramienta de la misma manera que comercializan en su tienda f&iacute;sica. Aqu&iacute; encontrar&aacute;s una diversidad de productos y empresas locales que se adapta a lo que buscas.  Apoya la creatividad, el dise&ntilde;o y la innovaci&oacute;n de estos empresarios.</p>
                <hr />
                <p>Estos son algunos datos que debes conocer sobre como funciona <a href="/"><b>Catrachos Shop</b></a>:</p>
                <ul>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Reg&iacute;strate.</li>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Revisa el cat&aacute;logo de productos de las tiendas o busca lo que necesitas.</li>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Agrega al carrito de compras los art&iacute;culos que deseas comprar.</li>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Completa un formulario con tu informaci&oacute;n de facturaci&oacute;n.</li>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Selecciona un m&eacute;todo de pago ya sea con tarjeta de cr&eacute;dito/d&eacute;bito o PayPal.</li>
                    <li><i class="fa fa-check" aria-hidden="true"></i> Pasa por t&uacute; compra o coordina con la empresa para realizar el env&iacute;o.</li>
                </ul>
                <hr />
                <p className="has-text-centered"><b>¡Apoya a las empresas locales!</b></p>
                <br />
              </div>
              <div className="column">
                <img src="/store.svg" alt="catrashosshop.com" width="500"/>
              </div>
            </div>
          </div>
        </div> {/*  Container */}
      </section>{/*  Section */}
    </React.Fragment>
  );
};

export default Home;