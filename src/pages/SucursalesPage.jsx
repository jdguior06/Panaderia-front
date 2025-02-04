import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSucursales,
  addSucursal,
  updateSucursal,
  deleteSucursal,
  activarSucursal,
} from "../reducers/sucursalSlice";
import SucursalModal from "../components/SucursalModal";
import {
  PencilSquareIcon,
  TrashIcon,
  BuildingStorefrontIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ThemedButton from "../components/ThemedButton";
import PermissionWrapper from "../components/PermissionWrapper";

const SucursalesPage = ({ setSelectedSucursal }) => {
  const dispatch = useDispatch();
  const { sucursales, loading, error } = useSelector(
    (state) => state.sucursales
  );
  const { theme } = useTheme(); // Extrae el tema actual
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSucursalLocal, setSelectedSucursalLocal] = useState(null); // Estado local para el modal
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    dispatch(fetchSucursales());
  }, [dispatch]);

  const handleOpenModal = (sucursal = null) => {
    setSelectedSucursalLocal(sucursal);
    setIsEditing(!!sucursal);
    setOpenModal(true);
  };

  const handleSave = async (sucursal) => {
    if (isEditing) {
      await dispatch(updateSucursal({ id: sucursal.id, sucursal }));
    } else {
      await dispatch(addSucursal(sucursal));
    }
    setOpenModal(false);
    dispatch(fetchSucursales());
  };

  const handleDelete = async (id) => {
    const sucursal = sucursales.find((s) => s.id === id);
    if (sucursal.activo) {
      await dispatch(deleteSucursal(id));
    } else {
      await dispatch(activarSucursal(id));
    }
    dispatch(fetchSucursales());
  };

  const filteredSucursales = sucursales.filter(
    (sucursal) =>
      (showInactive || sucursal.activo) &&
      (sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sucursal.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div style={{ color: theme.textColor }}>Cargando...</div>;
  if (error)
    return <div style={{ color: theme.textColor }}>Error: {error}</div>;

  const handleSelectSucursal = (sucursal) => {
    setSelectedSucursal(sucursal);
    navigate(`/sucursales/${sucursal.id}/panel`);
  };

  return (
    <>
      <SucursalModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedSucursal={selectedSucursalLocal}
        onSave={handleSave}
        isEditing={isEditing}
      />

      <div
        className="container mx-auto p-6"
        style={{
          color: theme.textColor,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: theme.textColor }}
        >
          Gestión de Sucursales
        </h2>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar Sucursal"
            className="border rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 transition"
            style={{
              color: theme.textColor,
              backgroundColor: theme.backgroundColor,
              borderColor: theme.primaryColor,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <PermissionWrapper permission="PERMISO_ADMINISTRAR_SUCURSALES">
            <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
              Crear Sucursal
            </ThemedButton>
          </PermissionWrapper>

          <div className="flex items-center">
            <PermissionWrapper permission="PERMISO_ADMINISTRAR_SUCURSALES">
              <input
                type="checkbox"
                id="showInactive"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                checked={showInactive}
                onChange={() => setShowInactive(!showInactive)}
              />
              <label htmlFor="showInactive" style={{ color: theme.textColor }}>
                Mostrar inactivas
              </label>
            </PermissionWrapper>
          </div>
        </div>

        {/* Lista de sucursales en formato de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSucursales.map((sucursal) => (
            <div
              key={sucursal.id}
              className={`p-4 rounded-lg shadow-lg transition ${
                sucursal.activo ? "bg-white" : "bg-gray-300"
              }`}
              // style={{
              //   backgroundColor: sucursal.activo
              //     ? theme.backgroundColor
              //     : "#f0f0f0",
              //   color: theme.textColor,
              // }}
            >
              <h3 className="text-xl font-bold mb-2">{sucursal.nombre}</h3>
              <p className="text-sm">
                <strong>Código:</strong> {sucursal.codigo}
              </p>
              <p className="text-sm">
                <strong>Nit:</strong> {sucursal.nit}
              </p>
              <p className="text-sm">
                <strong>Razón Social:</strong> {sucursal.razon_social}
              </p>
              <p className="text-sm">
                <strong>Dirección:</strong> {sucursal.direccion}
              </p>

              <div className="flex justify-between items-center mt-4">
                <PermissionWrapper permission="PERMISO_ADMINISTRAR_SUCURSALES">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-lg shadow-sm flex items-center transition transform hover:scale-105"
                    onClick={() => handleOpenModal(sucursal)}
                  >
                    <PencilSquareIcon className="h-5 w-5 mr-1" />
                  </button>

                  <button
                    className={`${
                      sucursal.activo
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } py-1 text-white px-3 rounded-lg shadow transform transition hover:scale-105`}
                    onClick={() => handleDelete(sucursal.id)}
                  >
                    {sucursal.activo ? (
                      <TrashIcon className="h-5 w-5 mr-1" />
                    ) : (
                      <ArrowPathIcon className="h-5 w-5 mr-1" />
                    )}
                  </button>
                </PermissionWrapper>

                <button
                  className="text-white py-1 px-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-sm flex items-center transition transform hover:scale-105"
                  onClick={() => handleSelectSucursal(sucursal)}
                >
                  <BuildingStorefrontIcon className="h-5 w-5 mr-1" />
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SucursalesPage;
