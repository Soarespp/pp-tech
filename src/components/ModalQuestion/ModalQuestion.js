const ModalQuestion = ({ open, title, subtitle, onConfirm, onCancel }) => {
  if (!open) return null;

  const handleConfirme = () => {
    onConfirm?.();
    onCancel?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 
                flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 
                   transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {subtitle && (
          <div className="p-6 ">
            <h4>{subtitle}</h4>
          </div>
        )}

        <div className="p-4 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100
                     rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirme}
            className="px-6 py-2 bg-green-900 text-white rounded-lg
                     hover:bg-green-800 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalQuestion;
