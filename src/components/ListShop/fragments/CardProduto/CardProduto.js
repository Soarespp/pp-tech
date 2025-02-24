"use client";
import { useEffect, useState } from "react";

import ModalQuestion from "@/components/ModalQuestion";
import { useMercadoContext } from "@/context/mercado";
import { ItensCompra } from "@/services/compras_item";
import { FiMinus, FiPlus, FiCheck, FiAlertCircle } from "react-icons/fi";
import { PiTrashThin } from "react-icons/pi";

const CardProduto = ({ produto }) => {
  const [question, setQuestion] = useState(false);
  const [hasChangeQt, setHasChange] = useState(produto.id);
  const {
    list,
    changeValue,
    resetStatosItem,
    changeComprasItens,
    deleteProduto,
  } = useMercadoContext();

  const handleChangeQt = (value, id) => {
    if (value === 0) {
      setQuestion(true);
      return;
    }
    const { compras_itens } = list;
    const dadosItensCompras = compras_itens.map((old) =>
      old.id !== id ? old : { ...old, qt: value }
    );

    changeComprasItens(dadosItensCompras);
  };

  const handleRemoveProduto = () => {
    const dadosItensCompras = list.compras_itens.filter(
      (old) => old.id !== produto.id
    );

    changeComprasItens(dadosItensCompras);
  };

  const handleConfirmeChangeQt = async () => {
    const { id, produtos, ...item } = produto;

    await ItensCompra.updateItensCompra(id, {
      confirmed: item.confirmed,
      falta: item.falta,
      qt: item.qt,
      id_produto: produtos.id,
      id_compras: list.id,
    });

    setHasChange(produto.qt);
  };

  useEffect(() => {
    setHasChange(produto.qt);
  }, []);

  return (
    <>
      <ModalQuestion
        title={`Produto ${produto.name} com quantidade 0`}
        subtitle="Deseja remover o produto, caso contrario não e permitido quantidade zero?"
        open={question}
        onCancel={() => setQuestion(false)}
        onConfirm={handleRemoveProduto}
      />
      <div
        className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200
                ${produto.confirmed ? "border-l-4 border-green-900" : ""}
                ${produto.falta ? "border-l-4 border-red-500" : ""}
                my-8`}
      >
        <div className="flex items-center p-4">
          <div className="relative w-50 h-50 flex-shrink-0">
            <img
              src={produto.img}
              alt={produto.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div
            className="ml-4 flex-grow text-center items-center 
        justify-center flex-row"
          >
            <h3 className="text-lg font-medium text-gray-800 capitalize mb-2">
              {produto.name}
            </h3>

            <div
              className="flex items-center space-x-2 
          text-center justify-center
          "
            >
              <button
                onClick={() => handleChangeQt(produto.qt - 1, produto.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 
                       rounded-full text-gray-600 hover:bg-gray-200 
                       transition-colors duration-200"
              >
                <FiMinus size={16} />
              </button>
              <input
                value={produto.qt}
                readOnly
                className="w-12 text-center bg-gray-50 border rounded-md py-1"
              />
              <button
                onClick={() => handleChangeQt(produto.qt + 1, produto.id)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 
                       rounded-full text-gray-600 hover:bg-gray-200 
                       transition-colors duration-200"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>
          <button onClick={() => deleteProduto(produto.id)}>
            <PiTrashThin size={20} />
          </button>
        </div>

        <div className="flex border-t">
          {produto.confirmed || produto.falta ? (
            <button
              onClick={() => resetStatosItem(produto.id)}
              className={`flex-1 py-3 flex items-center justify-center
                 transition-colors duration-200 
                 `}
            >
              <FiAlertCircle className="mr-2" size={18} />
              Voltar
            </button>
          ) : hasChangeQt !== produto.qt ? (
            <button
              onClick={() => handleConfirmeChangeQt()}
              className={`flex-1 py-3 flex items-center justify-center
               transition-colors duration-200 bg-yellow-200 border-yellow-500
               ${
                 produto.falta
                   ? "bg-red-50 text-red-600"
                   : "hover:bg-gray-50 text-gray-600"
               }`}
            >
              <FiAlertCircle className="mr-2" size={18} />
              Confirmar alteração de quantidade
            </button>
          ) : (
            <>
              <button
                onClick={() => changeValue("falta", true, produto.id)}
                className={`flex-1 py-3 flex items-center justify-center
                   transition-colors duration-200 
                   ${
                     produto.falta
                       ? "bg-red-50 text-red-600"
                       : "hover:bg-gray-50 text-gray-600"
                   }`}
              >
                <FiAlertCircle className="mr-2" size={18} />
                Falta
              </button>
              <div className="w-px bg-gray-200" />
              <button
                onClick={() => changeValue("confirmed", true, produto.id)}
                className={`flex-1 py-3 flex items-center justify-center
                   transition-colors duration-200
                   ${
                     produto.confirmed
                       ? "bg-green-100 text-green-900"
                       : "hover:bg-gray-50 text-gray-600"
                   }`}
              >
                <FiCheck className="mr-2" size={18} />
                Confirma
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CardProduto;
