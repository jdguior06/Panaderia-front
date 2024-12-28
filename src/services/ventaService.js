import api from '../utils/api';

export const realizarVentaApi = async (ventaData) => {
  try {
    const response = await api.post('/venta', ventaData);
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.errors?.join(', ')
      || error.message 
      || 'Error al realizar la venta';
    
    throw new Error(errorMessage);
  }
};

export const obtenerVentasApi = async () => {
  try {
    const response = await api.get('/venta');
    return response.data.data; // Supone que `data` contiene la lista de ventas
  } catch (error) {
    console.error("Error al obtener las ventas:", error.response?.data);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Error al obtener las ventas'
    );
  }
};

export const obtenerVentaPorIdApi = async (id) => {
  try {
    const response = await api.get(`/venta/${id}`);
    return response.data.data; // Supone que `data` contiene los detalles de la venta
  } catch (error) {
    console.error("Error al obtener la venta:", error.response?.data);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Error al obtener la venta'
    );
  }
};