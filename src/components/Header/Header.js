<header className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <Link
        href="/home"
        className="inline-flex items-center px-4 py-2 
                 bg-white rounded-lg shadow-sm 
                 hover:shadow-md transition-all duration-200
                 text-gray-700 hover:text-green-900
                 border border-gray-100 hover:border-green-900
                 group"
      >
        <FiArrowLeft
          className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                             transition-transform duration-200"
        />
        <span className="font-medium">Voltar</span>
      </Link>

      <div className="flex items-center space-x-4">
        <FiShoppingCart className="w-6 h-6 text-green-900" />
        <h1 className="text-xl font-semibold text-gray-800">
          Lista de Compras
        </h1>
      </div>
    </div>
  </div>
</header>;
