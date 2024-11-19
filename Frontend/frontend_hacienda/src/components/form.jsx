import React, { useState } from 'react';
import getContribuyente from '../services/getContribuyente';
import postContribuyente from '../services/postContribuyente';

const Form = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [contribuyenteData, setContribuyenteData] = useState(null);

  // Función para separar el nombre completo en primer nombre, primer apellido y segundo apellido
  const separarNombre = (nombreCompleto) => {

    const nombres = nombreCompleto.split(' ');

    const primerNombre = nombres[0]; 
    const primerApellido = nombres.length > 1 ? nombres[nombres.length - 2] : '';
    const segundoApellido = nombres.length > 2 ? nombres[nombres.length - 1] : '';

    return {primerNombre, primerApellido, segundoApellido};
  };

  const SearchButton = async () => {
    if (identificacion) {
      try {

        const data = await getContribuyente(identificacion);
        setContribuyenteData(data);  

        const {primerNombre, primerApellido, segundoApellido} = separarNombre(data.nombre);
        
        await postContribuyente(data.identificacion, primerNombre, primerApellido, segundoApellido);

      } catch (error) {
        console.error('Error al consultar o guardar el contribuyente:', error);
      }
    }
  };

  return (
    <div>
      <h1>Consultar Contribuyente</h1>

      <label>Identificación:</label>
      <input
        type="number"
        value={identificacion}
        onChange={(e) => setIdentificacion(e.target.value)}
      />
      <button onClick={SearchButton}>Consultar</button>

      <div>
        <h2>Datos del Contribuyente</h2>
        {contribuyenteData && contribuyenteData.nombre ? (
          <>
            <p>Nombre Completo: {contribuyenteData.nombre}</p>
            <p>Primer Nombre: {separarNombre(contribuyenteData.nombre).primerNombre}</p>
            <p>Primer Apellido: {separarNombre(contribuyenteData.nombre).primerApellido}</p>
            <p>Segundo Apellido: {separarNombre(contribuyenteData.nombre).segundoApellido}</p>
          </>
        ) : (
          <p>No hay datos para mostrar</p>
        )}
      </div>
    </div>
  );
};

export default Form;
