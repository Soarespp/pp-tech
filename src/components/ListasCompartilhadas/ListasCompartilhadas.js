"use client";

import { useLoginContext } from "@/context/Login";
import { useMercadoContext } from "@/context/mercado";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX, FiPlus, FiSearch, FiCheck } from "react-icons/fi";

const ListasCompartilhadas = ({ open, onClose }) => {
  const [search, setSearch] = useState("");
  const { comprasCompartilhadas, userDados } = useLoginContext();
  const { usersVinculo, changeList } = useMercadoContext();

  const [userVinculados, setUserVinculados] = useState(usersVinculo ?? []);

  const userLogado = userDados?.user_name;
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Users List */}
        <div>
          <h2>Lista compras compartilhadas</h2>
        </div>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <div className="space-y-2">
            {comprasCompartilhadas?.map((compras) => (
              <div
                key={usuario.id}
                className="flex items-center justify-between p-3 bg-gray-50 
                         rounded-lg hover:bg-gray-100 transition-colors"
              >
                teste
              </div>
            ))}

            {(!comprasCompartilhadas || comprasCompartilhadas.length === 0) && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma compra compartilhada</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100
                   rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              changeList("usuarios", userVinculados);
              onClose();
            }}
            className="px-6 py-2 bg-green-900 text-white rounded-lg
                   hover:bg-green-800 transition-colors
                   flex items-center space-x-2"
          >
            <FiCheck className="w-5 h-5" />
            <span>Confirmar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListasCompartilhadas;
