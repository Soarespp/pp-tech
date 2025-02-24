import CardProduto from "./fragments/CardProduto";

const ListShop = ({ lista, setTypeList, typeList }) => {
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
            .sort((a, b) => a.id - b.id)
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
