import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategorias,
  addCategoria,
  updateCategoria,
  deleteCategoria,
  activarCategoria,
} from "../reducers/categoriaSlice";
import CategoriaModal from "../components/CategoriaModal";
import CategoriaDeleteModal from "../components/CategoriaDeleteModal";
import { useTheme } from "../context/ThemeContext"; // Importar useTheme para obtener los colores del tema
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ThemedButton from "../components/ThemedButton";
import PermissionWrapper from "../components/PermissionWrapper";

const CategoriasPage = () => {
  const dispatch = useDispatch();
  const { categorias, loading, error } = useSelector(
    (state) => state.categorias
  );
  const { theme } = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleOpenModal = (categoria = null) => {
    setSelectedCategoria(categoria);
    setIsEditing(!!categoria);
    setOpenModal(true);
  };

  const handleOpenDeleteModal = (categoria) => {
    setSelectedCategoria(categoria);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (id) => {
    const categoria = categorias.find((c) => c.id === id);
    if (categoria.activo) {
      await dispatch(deleteCategoria(id));
    } else {
      await dispatch(activarCategoria(id));
    }
    setOpenDeleteModal(false);
    dispatch(fetchCategorias());
  };

  const handleSave = (categoria) => {
    if (isEditing) {
      dispatch(updateCategoria({ id: selectedCategoria.id, categoria }));
    } else {
      dispatch(addCategoria(categoria));
    }
    setOpenModal(false);
    dispatch(fetchCategorias());
  };

  const filteredCategorias = categorias.filter(
    (categoria) =>
      (showInactive || categoria.activo) &&
      (categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoria.descripcion
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()))
  );

  const indexOfLastCategoria = currentPage * categoriesPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - categoriesPerPage;
  const currentCategorias = filteredCategorias.slice(
    indexOfFirstCategoria,
    indexOfLastCategoria
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="text-center text-xl" style={{ color: theme.textColor }}>
        Cargando...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div
      className="container mx-auto p-6"
      style={{ color: theme.textColor, backgroundColor: theme.backgroundColor }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: theme.textColor }}
      >
        Gestión de Categorías
      </h2>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar Categoría"
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <PermissionWrapper permission="PERMISO_ADMINISTRAR_CATEGORIAS">
          <ThemedButton variant="primary" onClick={() => handleOpenModal()}>
            Crear Categoría
          </ThemedButton>

          <div className="flex items-center ml-4">
            <input
              type="checkbox"
              id="showInactive"
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            <label htmlFor="showInactive" style={{ color: theme.textColor }}>
              Mostrar inactivos
            </label>
          </div>
        </PermissionWrapper>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Nombre</th>
              <th className="py-3 px-4 text-left font-semibold">Descripción</th>
              <PermissionWrapper permission="PERMISO_ADMINISTRAR_CATEGORIAS">
                <th className="py-3 px-4 text-left font-semibold">Acciones</th>
              </PermissionWrapper>
            </tr>
          </thead>
          <tbody>
            {currentCategorias.map((categoria) => (
              <tr
                key={categoria.id}
                className={`${categoria.activo ? " " : "bg-gray-200"} `}
              >
                <td className="border-b border-gray-200 py-3 px-4">
                  {categoria.nombre}
                </td>
                <td className="border-b border-gray-200 py-3 px-4">
                  {categoria.descripcion || "Sin descripción"}
                </td>
                <PermissionWrapper permission="PERMISO_ADMINISTRAR_CATEGORIAS">
                  <td className="flex space-x-2 border-b border-gray-200 py-3 px-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center w-8 h-8 rounded-full shadow-sm"
                      onClick={() => handleOpenModal(categoria)}
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button
                      className={`${
                        categoria.activo
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } py-1 text-white px-3 rounded-lg shadow transform transition hover:scale-105`}
                      onClick={() => handleOpenDeleteModal(categoria)}
                    >
                      {categoria.activo ? (
                        <TrashIcon className="h-4 w-4" />
                      ) : (
                        <ArrowPathIcon className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </PermissionWrapper>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <nav className="inline-flex space-x-2">
          {Array.from(
            {
              length: Math.ceil(filteredCategorias.length / categoriesPerPage),
            },
            (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                } border-gray-300 shadow-sm transition`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Modal para crear/editar */}
      <CategoriaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedCategoria={selectedCategoria}
        onSave={handleSave}
        isEditing={isEditing}
      />

      {/* Modal de confirmación de eliminación */}
      <CategoriaDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        selectedCategoria={selectedCategoria}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoriasPage;
