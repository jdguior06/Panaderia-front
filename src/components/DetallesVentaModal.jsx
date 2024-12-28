import React from 'react';

const DetallesVentaModal = ({ venta, onClose }) => {
  if (!venta) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-4xl relative">
        {/* Botón para cerrar */}
        <button
          className="absolute top-4 right-4 text-red-500 font-bold"
          onClick={onClose}
        >
          Cerrar
        </button>

        <h2 className="text-xl font-bold mb-4">Detalles de la Venta: {venta.id}</h2>

        <div className="mb-4">
          <p>
            <strong>Caja:</strong> {venta.cajaSesion?.caja?.nombre || 'Anónimo'}
          </p>
          <p>
            <strong>Vendedor:</strong> {venta.cajaSesion?.usuario?.nombre || 'Anónimo'}
          </p>
          <p>
            <strong>Cliente:</strong> {venta.cliente?.nombre || 'Anónimo'}
          </p>
          <p>
            <strong>Fecha:</strong>{' '}
            {new Date(venta.fechaVenta).toLocaleString('es-ES', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </p>
          <p>
            <strong>Total:</strong> Bs. {venta.total}
          </p>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Precio Unitario</th>
              <th className="border border-gray-300 px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {venta.detalleVentaList?.map((detalle, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {detalle.producto.nombre || 'Producto no especificado'}
                </td>
                <td className="border border-gray-300 px-4 py-2">{detalle.cantidad}</td>
                <td className="border border-gray-300 px-4 py-2">Bs. {detalle.precio}</td>
                <td className="border border-gray-300 px-4 py-2">
                  Bs. {(detalle.monto).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <p className="text-lg font-bold">Total: Bs. {venta.total}</p>
        </div>
      </div>
    </div>
  );
};

export default DetallesVentaModal;