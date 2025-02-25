"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";
import { useLoginContext } from "@/context/Login";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const CustomHeader = ({ children }) => {
  const { userDados, usuarios } = useLoginContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { hasToken, deslogar } = useLoginContext();
  const { validation } = useAuth();

  useEffect(() => {
    validation();
  }, [usuarios]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="flex items-center  h-16 px-4 ">
          <div className="flex flex-1 justify-center ">
            <Link href="/home">
              <h1
                className={`
            font-bold text-green-600 whitespace-nowrap
            transition-opacity duration-300`}
              >
                Pedro Tech
              </h1>
            </Link>
          </div>
          {hasToken && (
            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    {userDados?.nome?.[0] + userDados?.nome?.[1]}
                  </div>
                  <FiChevronDown
                    className={`text-gray-600 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userDados?.nome}
                      </p>
                      <p className="text-sm text-gray-500">
                        {userDados?.email}
                      </p>
                    </div>

                    <Link
                      href="/perfil"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <FiUser className="mr-2" />
                      Perfil
                    </Link>

                    {/* <Link
                    href="/configuracoes"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <FiSettings className="mr-2" />
                    Configurações
                  </Link> */}

                    <div className="border-t border-gray-100">
                      <Link href={"/"}>
                        <button
                          onClick={() => {
                            deslogar();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <FiLogOut className="mr-2" />
                          Sair
                        </button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Overlay para fechar o dropdown ao clicar fora */}
                {isDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="p-4">{children}</main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomHeader;
