import React, { useState } from 'react';
import getContribuyente from '../services/getContribuyente';

const Form = () => {
  const [identificacion, setIdentificacion] = useState('');
  const [contribuyenteData, setContribuyenteData] = useState(); 

  const SearchButton = async () => {
    if (identificacion) {
        try {
            const data = await getContribuyente(identificacion);
            setContribuyenteData(data); 
        } catch (error) {
          console.error('Error al consultar el contribuyente:', error);
        }
    } else {
      console.log('Por favor ingrese un número de identificación');
    }
  }

  return (
    <div>
      <h1>Consultar Contribuyente</h1>

      <label>Identificación:</label>
      <input type="number" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
      <button onClick={SearchButton}>Consultar</button>

      <div>
        <h2>Datos del Contribuyente</h2>
        {contribuyenteData && contribuyenteData.nombre ? (
          <p>Nombre: {contribuyenteData.nombre}</p>
        ) : (
          <p>No hay datos para mostrar</p> // Si no hay datos o no hay nombre
        )}
      </div>

    </div>
  );
};

export default Form;
