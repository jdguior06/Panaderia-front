import api from '../utils/api';  // Instancia configurada de Axios

export const fetchCategoriasApi = async () => {
  try {
    const response = await api.get('/categoria');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las categorías');
  }
};

export const fetchCategoriasActivoApi = async () => {
  try {
    const response = await api.get('/categoria/active');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las categorías');
  }
};

export const fetchCategoriaApi = async (id) => {
  try {
    const response = await api.get(`/categoria/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la categoría');
  }
};

export const addCategoriaApi = async (categoria) => {
  try {
    const response = await api.post('/categoria', categoria);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la categoría');
  }
};

export const updateCategoriaApi = async (id, categoria) => {
  try {
    const response = await api.patch(`/categoria/${id}`, categoria);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar la categoría');
  }
};

export const deleteCategoriaApi = async (id) => {
  try {
    await api.patch(`/categoria/${id}/desactivar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar la categoría');
  }
};

export const activarCategoriaApi = async (id) => {
  try {
    await api.patch(`/categoria/${id}/activar`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al activar la categoría');
  }
};
