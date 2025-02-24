"use client";

import { useRouter } from "next/navigation";
import { FiHome, FiPieChart, FiShoppingCart } from "react-icons/fi";

const menuItems = [
  {
    title: "Mercado",
    icon: <FiShoppingCart size={24} />,
    path: "/shopList",
    description: "Lista de mercado",
  },
  {
    title: "Investimentos",
    icon: <FiPieChart size={24} />,
    path: "/financeiro",
    description: "Gestão de investimentos e ativos",
  },
];

const ListMenu = () => {
  const router = useRouter();

  return (
    <nav className="p-6 space-y-4">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => router.push(item.path)}
          className="group flex items-center p-5 rounded-xl cursor-pointer
                     transition-all duration-200 ease-in-out
                     hover:bg-green-50 hover:shadow-lg
                     active:scale-[0.98]"
        >
          {/* Ícone com círculo de fundo */}
          <div className="flex-shrink-0">
            <div
              className="w-14 h-14 flex items-center justify-center
                          rounded-full bg-green-100 group-hover:bg-green-200
                          transition-colors duration-200"
            >
              <span className="text-green-600 group-hover:text-green-700">
                {item.icon}
              </span>
            </div>
          </div>

          {/* Texto e Descrição */}
          <div className="ml-6 flex-grow">
            <p
              className="text-lg font-medium text-gray-800 group-hover:text-green-600
                         transition-colors duration-200"
            >
              {item.title}
            </p>
            <p className="text-base text-gray-500 group-hover:text-gray-600 mt-1">
              {item.description}
            </p>
          </div>

          {/* Indicador de hover */}
          <div
            className="w-2 h-12 rounded-full bg-transparent
                         group-hover:bg-green-500 transition-all duration-200
                         opacity-0 group-hover:opacity-100"
          />
        </div>
      ))}
    </nav>
  );
};

export default ListMenu;
