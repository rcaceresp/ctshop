import React from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../session';

 const Footer = () => {
    const footerIconWidth = 30;
    
    return (
        <AuthUserContext.Consumer>
            { authUser => 
                <footer className="footer">
                    <div className="content has-text-centered">
                        <div className="row">
                            <div className="columns">
                                <div className="column">
                                    <img src="phone.svg" width={footerIconWidth} alt="Nuestro contacto" />
                                    <h5 className="title is-5 has-text-white">Cont&aacute;ctenos</h5>
                                    <ul>
                                        <li><a className="has-text-white" href="tel:+504 3000-0000">+(504) 2555-0000 </a></li>
                                        <li><label htmlFor=""><b>Oficinas:</b></label></li>
                                        <li><a className="has-text-white" href="tel:+504 3000-0000">+(504) 3000-0000</a></li>
                                    </ul>
                                </div>
                                <div className="column">
                                    <img src="gps.svg" width={footerIconWidth} alt="Nuestra direccion" />
                                    <h5 className="title is-5 has-text-white">Direcci&oacute;n</h5>
                                    <p>Nuevos Horizontes Business Center, <br />calle principal a Rancho el Coco, San Pedro Sula, Cort&eacute;s</p>
                                </div>
                                <div className="column">
                                    <img src="technology.svg" width={footerIconWidth} alt="Nuestra Informacion" />
                                    <h5 className="title is-5 has-text-white">Informaci&oacute;n</h5>
                                    <ul>
                                        <li><Link className="has-text-white" to={ROUTES.ABOUT_US}>Nosotros</Link></li>
                                        <li><a className="has-text-white" href="/">T&eacute;rminos y Condiciones</a></li>
                                        <li><a className="has-text-white" href="/">Preguntas Frecuentes </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="columns is-centered">
                                <div className="column is-three-quarters">
                                    <hr/>
                                    <p>Hecho por Reina Caceres</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </AuthUserContext.Consumer>
    );
}


export default Footer;
