import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerVentaPorIdApi, obtenerVentasApi, realizarVentaApi } from '../services/ventaService';

export const realizarVenta = createAsyncThunk(
  'venta/realizarVenta',
  async (ventaData, { rejectWithValue }) => {
    try {
      const data = await realizarVentaApi(ventaData);
      return data;  // Esta será la respuesta enviada al fulfilled
    } catch (error) {
      // Rechaza el valor con un mensaje claro del error
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerVentas = createAsyncThunk(
  'venta/obtenerVentas',
  async (_, { rejectWithValue }) => {
    try {
      const data = await obtenerVentasApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const obtenerVentaPorId = createAsyncThunk(
  'venta/obtenerVentaPorId',
  async (id, { rejectWithValue }) => {
    try {
      const data = await obtenerVentaPorIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ventaSlice = createSlice({
  name: 'venta',
  initialState: {
    ventas: [],      // Almacena las ventas realizadas
    ultimaVenta: null, // Almacena la última venta realizada
    detalleVenta: null,
    error: null,     // Almacena el mensaje de error en caso de fallo
    loading: false,  // Indica si hay una operación en curso
  },
  reducers: {
    limpiarError: (state) => {
      state.error = null; // Limpia cualquier error almacenado
    },
    limpiarUltimaVenta: (state) => {
      state.ultimaVenta = null; // Limpia el estado de la última venta
    },
    limpiarDetalleVenta: (state) => {
      state.detalleVenta = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerVentas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerVentas.fulfilled, (state, action) => {
        state.loading = false;
        state.ventas = action.payload;
      })
      .addCase(obtenerVentas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(obtenerVentaPorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerVentaPorId.fulfilled, (state, action) => {
        state.loading = false;
        state.detalleVenta = action.payload;
      })
      .addCase(obtenerVentaPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(realizarVenta.pending, (state) => {
        state.loading = true;   // Activa el estado de carga
        state.error = null;     // Limpia errores anteriores
        state.ultimaVenta = null; // Limpia la última venta para evitar confusión
      })
      .addCase(realizarVenta.fulfilled, (state, action) => {
        state.loading = false; // Finaliza el estado de carga
        state.ventas.push(action.payload); // Agrega la venta realizada al arreglo
        state.ultimaVenta = action.payload; // Almacena la última venta realizada
        state.error = null;
      })
      .addCase(realizarVenta.rejected, (state, action) => {
        state.loading = false; // Finaliza el estado de carga
        state.error = action.payload || 'Error al realizar la venta'; // Almacena el mensaje de error
      });
  },
});

// Exporta los reducers para limpiar errores y última venta
export const { limpiarError, limpiarUltimaVenta, limpiarDetalleVenta  } = ventaSlice.actions;
export default ventaSlice.reducer;
