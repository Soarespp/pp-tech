import { DashCDI, DashSelic } from "@/components";
import Link from "next/link";

import { FiHome, FiPieChart, FiArrowLeft } from "react-icons/fi";

const Financeiro = () => {
  return (
    <main>
      <Link
        href="/home"
        className="inline-flex items-center px-4 py-2 
                         bg-white rounded-lg shadow-sm 
                         hover:shadow-md transition-all duration-200
                         text-gray-700 hover:text-green-900
                         border border-gray-100 hover:border-green-100
                         group"
      >
        <FiArrowLeft
          className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                         transition-transform duration-200"
        />
        <span className="font-medium">Voltar</span>
      </Link>
      <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Título Principal */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Calculadora de Investimentos
            </h1>
            <p className="text-gray-600">Compare rendimentos CDI e SELIC</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <DashCDI />
            <DashSelic />
          </div>

          {/* Informações Adicionais */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Valores calculados com base nas taxas atuais do mercado</p>
            <p>Última atualização: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Financeiro;
