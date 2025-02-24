const DashSelic = () => {
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
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 ml-4">
          Cálculo SELIC
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
            Taxa SELIC
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200 outline-none"
            placeholder="13,75"
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

export default DashSelic;
