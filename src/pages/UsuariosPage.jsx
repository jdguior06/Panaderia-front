import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsuarios,
  deactivateUsuario,
  activateUsuario,
} from "../reducers/usuarioSlice";
import { fetchRoles } from "../reducers/rolSlice"; // Importa la acción para cargar roles
import UsuarioModal from "../components/UsuarioModal";
import {
  PencilIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import ThemedButton from "../components/ThemedButton";

const UsuariosPage = () => {
  const dispatch = useDispatch();
  const { usuarios, loading, error } = useSelector((state) => state.usuarios);
  const { roles } = useSelector((state) => state.roles); // Obtén la lista de roles desde el estado
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsuarios());
    dispatch(fetchRoles()); // Carga los roles cuando se monta la página
  }, [dispatch]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCheckboxChange = (e) => setShowInactive(e.target.checked);

  const filteredUsuarios = usuarios
    .filter((usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((usuario) => showInactive || usuario.activo);

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const toggleUserStatus = (id, isActive) => {
    if (isActive) {
      dispatch(deactivateUsuario(id));
    } else {
      dispatch(activateUsuario(id));
    }
  };

  if (loading) return <p className="text-gray-600">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Gestión de Usuarios
      </h1>

      {/* Barra de Búsqueda */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="flex items-center ml-4"></div>

        <input
          type="checkbox"
          id="showInactive"
          checked={showInactive}
          onChange={handleCheckboxChange}
          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
        />
        <label htmlFor="showInactive" style={{ color: theme.textColor }}>
          Mostrar inactivos
        </label>
      </div>

      <ThemedButton
        variant="primary"
        className="mb-6"
        onClick={() => openModal()}
      >
        <span>Agregar Usuario</span>
      </ThemedButton>

      <div className="overflow-x-auto">
        <table className="w-full mb-6 border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-3 px-4 border">Nombre</th>
              <th className="py-3 px-4 border">Apellido</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Rol</th>{" "}
              {/* Nueva columna de Rol */}
              <th className="py-3 px-4 border">Estado</th>
              <th className="py-3 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border">{usuario.nombre}</td>
                <td className="py-3 px-4 border">{usuario.apellido}</td>
                <td className="py-3 px-4 border">{usuario.email}</td>
                <td className="py-3 px-4 border text-center">
                  {usuario.rol[0]?.nombre || "Sin rol"}{" "}
                  {/* Muestra el rol o "Sin rol" si no existe */}
                </td>
                <td className="py-3 px-4 border text-center">
                  {usuario.activo ? (
                    <span className="inline-flex items-center text-green-600">
                      <CheckCircleIcon className="w-5 h-5 mr-1" />
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-600">
                      <XCircleIcon className="w-5 h-5 mr-1" />
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 border flex space-x-2">
                  <button
                    onClick={() => openModal(usuario)}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition duration-150"
                  >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => toggleUserStatus(usuario.id, usuario.activo)}
                    className={`flex items-center ${
                      usuario.activo
                        ? "text-red-500 hover:text-red-600"
                        : "text-green-500 hover:text-green-600"
                    } transition duration-150`}
                  >
                    {usuario.activo ? (
                      <>
                        <XCircleIcon className="w-5 h-5 mr-1" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-5 h-5 mr-1" />
                        Activar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Crear/Editar Usuario */}
      {isModalOpen && (
        <UsuarioModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={editingUser}
          roles={roles} // Pasa la lista de roles al modal
        />
      )}
    </div>
  );
};

export default UsuariosPage;
