"use client";

import { useLoginContext } from "@/context/Login";
import { useMercadoContext } from "@/context/mercado";
import { useEffect, useState } from "react";
import { FiX, FiPlus, FiSearch, FiCheck } from "react-icons/fi";

const VinculaUsers = ({ open, onClose }) => {
  const [search, setSearch] = useState("");
  const { usuarios, userDados } = useLoginContext();

  const { vincularUsuarios, vinculosCompras, list } = useMercadoContext();
  const [usersVinculo, setUserVinculo] = useState(vinculosCompras);

  const userLogado = userDados?.user_name;

  if (!open) return null;

  const filteredUsuarios = usuarios?.filter((user) =>
    user?.nome.toLowerCase().includes(search.toLowerCase() ?? "")
  );

  const handleConfirme = () => {
    const updateVincUsers = usersVinculo.map((vin) => ({
      usuario_id: vin.usuario_id,
      compra_id: list.id,
    }));
    vincularUsuarios(updateVincUsers);
    onClose();
  };

  // useEffect(() => {
  //   setUserVinculo(vinculosCompras);
  // }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Vincular Usuários
          </h2>
          <button onClick={() => setUserVinculo(vinculosCompras)}>
            reload
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuário..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg
                     focus:ring-2 focus:ring-green-900 focus:border-green-900
                     transition-all duration-200 outline-none"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto max-h-[60vh] p-4">
          <div className="space-y-2">
            {filteredUsuarios
              ?.filter((item) => item.user_name !== userLogado)
              ?.map((usuario) => (
                <div
                  key={usuario.id}
                  className="flex items-center justify-between p-3 bg-gray-50 
                         rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 bg-green-100 rounded-full flex 
                                items-center justify-center"
                    >
                      <span className="text-green-900 font-medium">
                        {usuario?.nome[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {usuario.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {usuario.email || "Sem email"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={usersVinculo.find(
                        (u) => usuario.id === u.usuario_id
                      )}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setUserVinculo((old) => [
                            ...old,
                            { usuario_id: usuario.id, compra_id: list.id },
                          ]);
                        } else {
                          const teste =
                            usersVinculo?.filter(
                              (us) => us.usuario_id !== usuario.id
                            ) || [];

                          setUserVinculo(teste);
                        }
                      }}
                      className="w-5 h-5 text-green-900 border-gray-300 rounded
                             focus:ring-green-900 transition-colors cursor-pointer"
                    />
                  </div>
                </div>
              ))}

            {filteredUsuarios?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum usuário encontrado</p>
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
            onClick={handleConfirme}
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

export default VinculaUsers;
