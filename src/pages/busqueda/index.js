import React from 'react';
import { getQuery } from '../../utils/searchbar';
import BusquedaResults from '../../components/busqueda';

const BusquedaPage = () => {
  return(
    <BusquedaResults query={getQuery()}/>
  );
};

export default BusquedaPage;