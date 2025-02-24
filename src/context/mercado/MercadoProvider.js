"use client";

import { useEffect, useState, useTransition } from "react";
import { MercadoContext } from "./MercadoContext";
import produtoImage from "@/dataMOck/extencoes_vscode.jpg";
import { produtoService } from "@/services/produtos";
import { listsCompras, UsuarioCompras } from "@/services";
import { useLoginContext } from "../Login";
import { ItensCompra } from "@/services/compras_item";

export const MercadoProvider = ({ children }) => {
  const { userDados, getDadosUsuarios } = useLoginContext();

  const [search, setSearch] = useState("");
  const [list, setList] = useState({});
  const [typeList, setTypeList] = useState("SHOP");
  const [produtos, setProdutos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [vinculosCompras, setVinculosCompras] = useState([]);

  const [comprasCompartilhadas, setComprasCompartilhadas] = useState([]);

  const [isPending, startTransition] = useTransition();

  // console.log("Mercado Provider", {
  //   list,
  //   produtos,
  //   userDados,
  //   vinculosCompras,
  // });

  const updateProduto = async (prod, id) => {
    await ItensCompra.updateItensCompra(id, {
      confirmed: prod.confirmed,
      falta: prod.falta,
      qt: prod.qt,
      id_produto: prod.produtos.id,
      id_compras: list.id,
    });
  };

  const changeValue = (campo, value, id) => {
    let prodChange = undefined;
    setList((old) => ({
      ...old,
      compras_itens: old.compras_itens.map((defaultItem) => {
        if (defaultItem.id !== id) {
          return defaultItem;
        }
        prodChange = { ...defaultItem, [campo]: value };
        return prodChange;
      }),
    }));

    updateProduto(prodChange, id);
  };

  const changeComprasItens = (itens) => {
    setList((old) => ({
      ...old,
      compras_itens: itens,
    }));
  };

  const changeQtProd = (value, id) => {
    setList((old) => ({
      ...old,
      compras_itens: list.compras_itens.map((item) =>
        item.id !== id ? item : { ...item, qt: value }
      ),
    }));
  };

  const changeList = (campo, value) => {
    setList((old) => ({ ...old, [campo]: value }));
  };

  const resetStatosItem = (idItem) => {
    let prodChange = undefined;
    const { compras_itens } = list;

    setList((old) => ({
      ...old,
      compras_itens: old.compras_itens.map((defaultItem) => {
        if (defaultItem.id !== idItem) {
          return defaultItem;
        }

        prodChange = { ...defaultItem, falta: false, confirmed: false };
        return prodChange;
      }),
    }));

    updateProduto(prodChange, idItem);
  };

  const getDadosListaMercado = () => {
    startTransition(async () => {
      const compras = await listsCompras.getListCompras(userDados.user_name);

      startTransition(() => {
        setList(compras);
      });
    });
  };

  const getDadosProdutos = async () => {
    startTransition(async () => {
      const dataProdutos = await produtoService.getProdutos();

      startTransition(() => {
        setProdutos(dataProdutos);
      });
    });
  };

  const finalizarListaMercado = async () => {
    const { compras_itens } = list;
    await listsCompras.updateCompras(list.id, { dtFim: new Date() });

    getDadosListaMercado();
  };

  const deleteProduto = async (id) => {
    await ItensCompra.deleteProduto(id);
    setList((old) => ({
      ...old,
      compras_itens: old.compras_itens.filter((prod) => prod.id !== id),
    }));
  };

  const controlProdutoLista = async (listProdutos, add = true) => {
    let comprasNew;
    if (!list.id) {
      comprasNew = await listsCompras.insertCompras();
      await UsuarioCompras.insertUsuarioCompras({
        usuario_id: userDados.id,
        compra_id: comprasNew.id,
      });
    }

    const inputProdutos = listProdutos.reduce((itens, item) => {
      const listItensImput = list?.compras_itens?.find(
        (prod) => prod.id === item.id
      );

      if (listItensImput) {
        return itens;
      }

      return [
        ...itens,
        {
          confirmed: false,
          falta: false,
          qt: 1,
          id_produto: item.id,
          id_compras: list?.id ?? comprasNew.id,
        },
      ];
    }, []);

    await ItensCompra.insertItensCompras(inputProdutos);
    getDadosListaMercado();
  };

  const getHistorico = async () => {
    const data = await listsCompras.getHistoricoCompras(userDados?.user_name);
    setHistorico(data);
  };

  const getUsuariosCompras = async () => {
    if (!userDados) {
      return;
    }
    const data = await UsuarioCompras.getComprasUsuarios(userDados?.id);

    setVinculosCompras(data);
  };

  const clonarHistorico = async (idHistorico) => {
    const dataHistorico = await listsCompras.insertCompras();

    const idfinaliza = list.id ?? null;

    await listsCompras.cloneComprasItens(
      idHistorico,
      dataHistorico.id,
      userDados.id,
      idfinaliza
    );

    getDadosListaMercado();
  };

  const vincularUsuarios = async (usersVinc) => {
    if (!list?.id) {
      return false;
    }

    if (usersVinc?.length < 1) {
      const limparTodos = vinculosCompras.map((del) => del.id);

      await UsuarioCompras.deleteUsuariosCompras(limparTodos);
      getUsuariosCompras();
      return;
    }

    const deleteUsers = vinculosCompras.filter(
      (fil) =>
        !usersVinc.find(
          (i) =>
            i.usuario_id === fil.usuario_id && i.compra_id === fil.compra_id
        )
    );

    const insertUsers = usersVinc.filter(
      (fil) =>
        !vinculosCompras.find(
          (i) =>
            i.usuario_id === fil.usuario_id && i.compra_id === fil.compra_id
        )
    );

    await UsuarioCompras.deleteUsuariosCompras(deleteUsers);
    await UsuarioCompras.insertUsuarioCompras(insertUsers);
    getUsuariosCompras();
  };

  const atualizarAll = () => {
    if (!userDados) {
      return;
    }

    getDadosProdutos();
    getDadosListaMercado();
    getHistorico();
    getUsuariosCompras();
  };

  useEffect(() => {
    if (!userDados) {
      return;
    }

    console.log("effet mercado provider", userDados);
    getDadosListaMercado();
    getDadosProdutos();
  }, [userDados]);

  const valueProvider = {
    search,
    list,
    typeList,
    produtos,
    historico,
    comprasCompartilhadas,
    vinculosCompras,
    setVinculosCompras,
    changeList,
    setSearch,
    changeValue,
    changeQtProd,
    resetStatosItem,
    setTypeList,
    getDadosProdutos,
    setProdutos,
    getDadosListaMercado,
    finalizarListaMercado,
    controlProdutoLista,
    changeComprasItens,
    getHistorico,
    clonarHistorico,
    deleteProduto,
    vincularUsuarios,
    atualizarAll,
  };

  return (
    <MercadoContext.Provider value={valueProvider}>
      {children}
    </MercadoContext.Provider>
  );
};
