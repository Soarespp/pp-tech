"use client";

import { ModalQuestion } from "@/components";
import { useMercadoContext } from "@/context/mercado";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginContext } from "@/context/Login";

const HistoricoCompras = () => {
  const router = useRouter();
  const { historico, getHistorico, clonarHistorico, list } =
    useMercadoContext();
  const { userDados } = useLoginContext();

  const [openModal, setOpenModal] = useState({
    open: false,
    idHistorico: undefined,
  });
  const [selectedList, setSelectedList] = useState(null);

  const clickReaproveitar = (idHistorico) => {
    clonarHistorico(openModal.idHistorico);
    router.push("/shopList");
  };

  useEffect(() => {
    getHistorico();
  }, []);

  const getTextoAviso = () => {
    if (list.compras_itens?.length > 0) {
      return "Existe uma listagem em aberto, se proceguir vai encerrar todos esses itens e gerar uma nova. Deseja procesguir?";
    }

    return "Vai gerar uma nova lista de compras com os mesmos itens";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalQuestion
        open={openModal.open}
        title="Deseja reaproveitar esta lista?"
        subtitle={getTextoAviso()}
        onConfirm={clickReaproveitar}
        onCancel={() => setOpenModal({ open: false, idHistorico: undefined })}
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/shopList"
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
            <h1 className="text-xl font-semibold text-gray-800">
              Histórico de Compras
            </h1>
            {/* <button
              onClick={() => {
                getHistorico(userDados.user_name);
              }}
            >
              reload
            </button> */}
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Lista de Histórico */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {historico.map((his) => (
            <div
              key={his.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md 
                       transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      Lista de {new Date(his.dtFim).toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {his.compras_itens?.length}{" "}
                      {his.compras_itens?.length === 1 ? "item" : "itens"}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedList(his);
                      setOpenModal({ open: true, idHistorico: his.id });
                    }}
                    className="p-2 text-gray-600 hover:text-green-900 
                             hover:bg-green-50 rounded-full
                             transition-all duration-200"
                    title="Reaproveitar lista"
                  >
                    <FiRefreshCcw className="w-5 h-5" />
                  </button>
                </div>

                {/* Lista de Produtos */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {his.compras_itens?.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className="text-sm px-3 py-1.5 bg-gray-50 rounded-full
                               text-gray-600 truncate"
                    >
                      {item.produtos.name}
                    </div>
                  ))}
                  {his.compras_itens?.length > 6 && (
                    <div
                      className="text-sm px-3 py-1.5 bg-gray-50 rounded-full
                                 text-gray-600"
                    >
                      +{his.compras_itens?.length - 6} itens
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {historico.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma compra registrada</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoricoCompras;
