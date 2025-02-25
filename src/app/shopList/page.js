"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FiArrowLeft,
  FiUserPlus,
  FiSearch,
  FiShoppingCart,
  FiRefreshCw,
} from "react-icons/fi";
import { BsCartPlus, BsBagCheck } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { TbBrandShopee } from "react-icons/tb";
import { GrHistory } from "react-icons/gr";
import { CiBoxList } from "react-icons/ci";

import {
  ListasCompartilhadas,
  ListProdutos,
  ListShop,
  ModalQuestion,
  VinculaUsers,
} from "@/components";
import { useMercadoContext } from "@/context/mercado";
import { categorias } from "@/utils/constantes";

const ShopList = () => {
  const router = useRouter();
  const {
    search,
    list,
    typeList,
    setTypeList,
    produtos,
    getDadosListaMercado,
    finalizarListaMercado,
    getUsuariosCompras,
  } = useMercadoContext();
  const [openCadProd, setOpenCadProd] = useState(false);
  const [openVincUsers, setOpenVincUsers] = useState(false);
  const [openListaCompartilhada, setOpenListaCompartilhada] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  const [filter, setFilter] = useState({ id: 0, label: "Todos" });

  useEffect(() => {
    getDadosListaMercado();
    getUsuariosCompras();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <ListProdutos
          produtos={produtos}
          open={openCadProd}
          onClose={() => setOpenCadProd(false)}
        />

        <VinculaUsers
          produtos={produtos}
          open={openVincUsers}
          onClose={() => setOpenVincUsers(false)}
        />
        <ListasCompartilhadas
          produtos={produtos}
          open={openListaCompartilhada}
          onClose={() => setOpenListaCompartilhada(false)}
        />
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Botão Voltar */}
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

              {/* Título */}
              <div className="flex items-center space-x-3">
                <FiShoppingCart className="w-6 h-6 text-green-900" />
                <h1 className="text-xl font-semibold text-gray-800">
                  Lista de Compras
                </h1>
              </div>

              {/* Menu de Opções */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  <SlOptionsVertical className="w-6 h-6 text-gray-600" />
                </button>

                {openOptions && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenOptions(false)}
                    />
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20
                              border border-gray-100 py-2"
                    >
                      <button
                        className="w-full px-4 py-2 flex items-center space-x-3 
                                    hover:bg-gray-50 transition-colors duration-200"
                      >
                        <BsBagCheck className="w-5 h-5 text-green-900" />
                        <span className="text-gray-700">Confirmar Todos</span>
                      </button>
                      <button
                        className="w-full px-4 py-2 flex items-center space-x-3 
                                    hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => {
                          setOpenVincUsers(true);
                          setOpenOptions(false);
                        }}
                      >
                        <FiUserPlus className="w-5 h-5 text-green-900" />
                        <span className="text-gray-700">Adicionar Usuário</span>
                      </button>
                      <button
                        onClick={() => {
                          setOpenCadProd(true);
                          setOpenOptions(false);
                        }}
                        className="w-full px-4 py-2 flex items-center space-x-3 
                                hover:bg-gray-50 transition-colors duration-200"
                      >
                        <BsCartPlus className="w-5 h-5 text-green-900" />
                        <span className="text-gray-700">Novo Produto</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("/shopList/historico");
                          setOpenOptions(false);
                        }}
                        className="w-full px-4 py-2 flex items-center space-x-3 
                                hover:bg-gray-50 transition-colors duration-200"
                      >
                        <GrHistory className="w-5 h-5 text-green-900" />
                        <span className="text-gray-700">Historico</span>
                      </button>
                      <button
                        onClick={() => {
                          setOpenListaCompartilhada(true);
                        }}
                        className="w-full px-4 py-2 flex items-center space-x-3 
                                hover:bg-gray-50 transition-colors duration-200"
                      >
                        <CiBoxList className="w-5 h-5 text-green-900" />
                        <span className="text-gray-700">Compartilhadas</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center overflow-x-auto hide-scrollbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4  gap-3">
          {[...categorias, { id: 0, label: "Todos" }]
            .sort((a, b) => a.id - b.id)
            .map((cat) => (
              <button
                key={cat.id}
                className={`
                px-4 py-2 rounded-lg font-medium text-sm
                hover:opacity-80
                border ${
                  filter === cat.label
                    ? "bg-white border-2 border-black"
                    : "bg-gray-100"
                }
                transition-all duration-200
                whitespace-nowrap
                min-w-[80px]
              `}
                onClick={() => setFilter(cat)}
              >
                {cat.label}
              </button>
            ))}
        </div>

        {/* Barra de Pesquisa */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-4">
              {/* Campo de Busca */}
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={search}
                  onChange={(e) => e.target.value}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 
                       rounded-lg focus:ring-2 focus:ring-green-900 
                       focus:border-green-900 transition-all duration-200
                       outline-none"
                />
              </div>

              {/* Botão de Busca */}
              <button
                className="px-6 py-2 bg-green-900 text-white rounded-lg
                         hover:bg-green-800 transition-colors duration-200
                         flex items-center whitespace-nowrap"
              >
                <FiSearch className="w-5 h-5 mr-2" />
                Buscar
              </button>

              {/* Botão de Reload */}
              <button
                onClick={() => getDadosListaMercado("pedro")}
                className="p-2 text-gray-600 hover:text-green-900 
                         hover:bg-green-50 rounded-full
                         transition-all duration-200"
                title="Atualizar lista"
              >
                <FiRefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navegação de Tipo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex justify-center bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-1 col-auto items-center justify-center">
              <button
                className={`flex items-center justify-center space-x-2 px-6 py-3 w-40
                     transition-all duration-200 cursor-pointer
                     ${
                       typeList === "SHOP"
                         ? "bg-green-900 text-white"
                         : "bg-white text-gray-600 hover:bg-gray-50"
                     }`}
                onClick={() => setTypeList("SHOP")}
              >
                <FiShoppingCart size={20} />
                <span className="font-medium">Lista</span>
              </button>

              <div className="w-px bg-gray-200" />

              <button
                className={`flex items-center justify-center space-x-2 px-6 py-3 w-40
              transition-all duration-200 cursor-pointer
              ${
                typeList !== "SHOP"
                  ? "bg-green-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
                onClick={() => setTypeList("PAYMENT")}
              >
                <FiShoppingCart size={20} />
                <span className="font-medium">Pagamento</span>
              </button>
            </div>
            {list.compras_itens?.length > 0 && (
              <button className={`flex `} onClick={() => setFinalizar(true)}>
                <TbBrandShopee size={30} className="mr-2 mt-2" />
              </button>
            )}
          </div>
        </div>

        {/* Lista de Produtos */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <ListShop
            lista={list?.compras_itens}
            typeList={typeList}
            setTypeList={setTypeList}
            filter={filter}
          />
        </main>
      </div>
      <ModalQuestion
        open={finalizar}
        title="Deseja encerrar a lista de compras?"
        subtitle="Se finalizar todos os produtos que não tiverem sido selecionados ficaram como falta"
        onConfirm={finalizarListaMercado}
        onCancel={() => setFinalizar(false)}
      />
    </>
  );
};

export default ShopList;
