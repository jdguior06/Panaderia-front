import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  permisos: [],
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, userEmail, nombre, apellido, role, permisos } = action.payload;

      state.token = token;
      state.user = {
        email: userEmail,
        nombre,
        apellido,
        role,
      };
      state.permisos = permisos;
      state.isAuthenticated = true;
      state.loading = false;

      localStorage.setItem('auth', JSON.stringify({
        token,
        user: { email: userEmail, nombre, apellido, role },
        permisos,
      }));
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.permisos = [];
      state.isAuthenticated = false;
      state.loading = false;

      localStorage.removeItem('auth');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const selectHasPermission = (state, permissionName) => {
  return Array.isArray(state.auth.permisos) && 
         state.auth.permisos.some((permiso) => permiso.nombre === permissionName);
};

export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
