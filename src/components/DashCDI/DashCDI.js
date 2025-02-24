const DashCDI = () => {
  return (
    <div className="bg-white backdrop-blur-lg bg-opacity-80 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-green-500 rounded-lg p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 ml-4">
          Cálculo CDI
        </h2>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Valor do saldo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              R$
            </span>
            <input
              type="number"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200 outline-none"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            % do CDI
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200 outline-none"
            placeholder="100"
          />
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Rendimento mensal
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              R$
            </span>
            <input
              disabled
              value="0,00"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCDI;
