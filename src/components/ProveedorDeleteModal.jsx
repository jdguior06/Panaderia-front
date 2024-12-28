import PropTypes from "prop-types";

const ProveedorDeleteModal = ({ open, onClose, selectedProveedor, onDelete }) => {

  if (!open) return null;

  const isActive = selectedProveedor?.activo;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-right cursor-pointer text-gray-500" onClick={onClose}>
          X
        </p>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold">
            ¿Estás seguro de {isActive ? 'desactivar' : 'activar'} al proveedor{" "}
            {selectedProveedor?.nombre}?
          </h3>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className={`${
              isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white py-2 px-4 rounded-lg`}
            onClick={() => onDelete(selectedProveedor.id)}  
          >
            {isActive ? 'Desactivar' : 'Activar'}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

ProveedorDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProveedor: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
};

export default ProveedorDeleteModal;
