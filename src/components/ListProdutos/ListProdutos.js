"use client";
import { useEffect, useState } from "react";

import { useMercadoContext } from "@/context/mercado";
import { useRouter } from "next/navigation";
import { FiX, FiPlus, FiSearch } from "react-icons/fi";
import { SlReload } from "react-icons/sl";
import { BsPencil } from "react-icons/bs";

const ListProdutos = ({ produtos, open, onClose }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { getDadosProdutos, controlProdutoLista, getDadosListaMercado } =
    useMercadoContext();
  const [loteProdutos, setLoteProdutos] = useState([]);

  if (!open) return null;

  const filteredProdutos = produtos?.filter((produto) =>
    produto.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = async (produto, lote = false) => {
    if (!lote) {
      await controlProdutoLista([produto]);
    } else {
      await controlProdutoLista(loteProdutos).then(() => getDadosProdutos());
    }

    // getDadosListaMercado();
    onClose();
  };

  const handleCheckProdutoLote = (checked, produto) => {
    if (checked) {
      setLoteProdutos((old) => [...old, produto]);
    } else {
      setLoteProdutos((old) => old.filter((p) => p.id !== produto));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Lista de Produtos
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-green-900 focus:border-green-900
                         transition-all duration-200 outline-none"
              />
            </div>

            <button
              className="p-2 text-gray-600 hover:text-green-900 
                       hover:bg-green-50 rounded-full
                       transition-all duration-200"
              title="Atualizar lista"
              onClick={getDadosProdutos}
            >
              <SlReload className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProdutos.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between p-3 bg-gray-50 
                         rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckProdutoLote(e.target.checked, produto)
                    }
                    className="w-5 h-5 text-green-900 border-gray-300 rounded
                             focus:ring-green-900 transition-colors cursor-pointer"
                  />
                  <div
                    className="w-12 h-12 bg-white rounded-lg flex items-center 
                              justify-center border"
                  >
                    {produto.img ? (
                      <img
                        src={produto.img}
                        alt={produto.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {produto.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {produto.category || "Sem categoria"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    router.push(`/shopList/cadastro?id=${produto.id}`)
                  }
                  className="p-2 hover:bg-green-900 hover:text-white
                         rounded-full transition-all duration-200"
                >
                  <BsPencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAddProduct(produto)}
                  className="p-2 hover:bg-green-900 hover:text-white
                         rounded-full transition-all duration-200"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {filteredProdutos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <div className="flex-1">
            <button
              onClick={() => router.push("/shopList/cadastro")}
              className="px-4 py-2 text-gray-600 hover:bg-green-200
                   rounded-lg transition-colors mr-2 border-2 border-green-600"
            >
              Cadastrar produto
            </button>
          </div>
          <button
            onClick={() => {
              setLoteProdutos([]);
              onClose();
            }}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100
                   rounded-lg transition-colors mr-2"
          >
            Cancelar
          </button>
          {loteProdutos.length > 0 ? (
            <button
              onClick={() => handleAddProduct(undefined, true)}
              className="px-4 py-2 bg-green-900 text-white
                 rounded-lg hover:bg-green-800 transition-colors"
            >
              Add todos
            </button>
          ) : (
            <button
              onClick={() => {
                setLoteProdutos([]);
                onClose();
              }}
              className="px-4 py-2 bg-green-900 text-white
                   rounded-lg hover:bg-green-800 transition-colors"
            >
              Concluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProdutos;
