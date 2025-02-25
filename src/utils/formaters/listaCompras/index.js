import { categorias } from "@/utils/constantes";

const formatListaProdutos = (produtos) => {
  if (!produtos) {
    return [];
  }

  return produtos.map((item) => item);
};

export const formatListaCompras = (dataLista) => {
  if (!dataLista) {
    return {};
  }

  const listaComrpas = formatListaProdutos(dataLista.compras_itens);

  return {
    id: dataLista.id,
    dtFim: dataLista.ftFim,
    listaComrpas,
    usuarios: [],
  };
};

export const getDadosCategoria = (id) => {
  return categorias.find((i) => i.id === id);
};
