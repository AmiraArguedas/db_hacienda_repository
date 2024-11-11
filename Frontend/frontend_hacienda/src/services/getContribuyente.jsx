async function getContribuyente(identificacion) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/consultar_contribuyente/${identificacion}/`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw error;
    }
  }
  
  export default getContribuyente;
  