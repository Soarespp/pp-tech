<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center">
      <div className="flex-grow relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar produto..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 
                   rounded-lg focus:ring-2 focus:ring-green-900 
                   focus:border-green-900 transition-all duration-200
                   outline-none"
        />
      </div>
      <button
        className="ml-4 px-6 py-2 bg-green-900 text-white rounded-lg
                 hover:bg-green-800 transition-colors duration-200
                 flex items-center"
      >
        <FiSearch className="w-5 h-5 mr-2" />
        Buscar
      </button>
    </div>
  </div>
</div>;
