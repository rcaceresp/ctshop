import React from 'react'
import SearchBar from '../../components/searchbar';

// Custom Components
import Ofertas from '../../components/home/ofertas';

const Home = props => {
  return(
    <React.Fragment>
      <SearchBar/>
      <Ofertas/>
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="card-content">
              <h3 className="title is-3">Catrachos Shop</h3>
              <hr/>
              <p>Es una plataforma de tiendas online para las MIPYMES (micro, pequeña y mediana empresa) donde nuestros afiliados podrán ofrecer sus productos o servicios a través de la red de la misma manera que comercializan en su tienda física. Esta herramienta brinda la posibilidad de expandir sus negocios, ampliar su mercado y de aprovechar las ventajas de un comercio virtual.</p>
              <p>Puedes crear tu tienda online, configurarla, describir los productos y añadir imágenes en cuestión de minutos. Tus clientes pueden pagar con tarjeta de crédito/débito o PayPal. Solo debes suscribirte y elegir uno de los diferentes planes para empezar a comercializar. Vender en línea puede ser muy fácil.</p>
              <p>¡Suscríbete! <br/>Y crea tu tienda online hoy mismo. Comienza a vender por Internet.</p>
            </div>
          </div>
        </div> {/*  Container */}
      </section>{/*  Section */}
    </React.Fragment>
  );
};

export default Home;