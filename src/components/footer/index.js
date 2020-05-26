import React from 'react'

 const Footer = () => {
     const footerIconWidth = 30;
    return (
        <footer class="footer">
            <div class="content has-text-centered">
                <div className="row">
                    <div className="columns">
                        <div className="column">
                            <img src="phone.svg" width={footerIconWidth} alt="Nuestro contacto" />
                            <h5 className="title is-5 has-text-white">Cont&aacute;ctenos</h5>
                            <ul>
                                <li><a className="has-text-white" href="tel:+504 3000-0000">+(504) 3000-0000 </a></li>
                                <li><label htmlFor=""><b>Oficinas:</b></label></li>
                                <li><a className="has-text-white" href="tel:+504 3000-0000">+(504) 3000-0000</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <img src="gps.svg" width={footerIconWidth} alt="Nuestra direccion" />
                            <h5 className="title is-5 has-text-white">Direcci&oacute;n</h5>
                            <p>San Pedro Sula: Barrio San Fernando, <br />1ra calle entre 11-12 avenida N.E. Autopista hacia el Aeropuerto Internacional Ramon Villeda Morales.</p>
                        </div>
                        <div className="column">
                            <img src="technology.svg" width={footerIconWidth} alt="Nuestra Informacion" />
                            <h5 className="title is-5 has-text-white">Informaci&oacute;n</h5>
                            <ul>
                                <li><a className="has-text-white" href="/">Nosotros</a></li>
                                <li><a className="has-text-white" href="/">Terminos y Condiciones</a></li>
                                <li><a className="has-text-white" href="/">Preguntas Frecuentes </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="columns is-centered">
                        <div className="column is-three-quarters">
                            <hr/>
                            <p>Hecho por Reina Caceres <span role="img" aria-label="Love">💖</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
