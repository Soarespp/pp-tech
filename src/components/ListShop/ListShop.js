import CardProduto from "./fragments/CardProduto";

const ListShop = ({ lista, typeOrder, typeList, filter }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          {lista
            ?.filter((fil) =>
              typeList === "PAYMENT"
                ? fil.confirmed || fil.falta
                : !fil.confirmed && !fil.falta
            )
            ?.filter((fil) =>
              filter.id === 0 ? true : fil.produtos.id_categoria === filter.id
            )
            .sort((a, b) => a.produtos.id_categoria - b.produtos.id_categoria)
            .map((itens) => (
              <CardProduto
                produto={{ ...itens, ...itens.produtos, id: itens.id }}
                key={itens.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListShop;
