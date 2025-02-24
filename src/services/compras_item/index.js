import { supabase } from "../supabase";

export const ItensCompra = {
  async insertItensCompras(item_compra) {
    try {
      const { error } = await supabase
        .from("compras_itens")
        .insert(item_compra);

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },

  async getListCompras(username) {
    try {
      const { data, error } = await supabase
        .from("compras")
        .select(
          `
          id,
          dtFim,
          compras_itens!inner (
            id,
            confirmed,
            falta,
            qt,
            produtos!inner (
              *
            )
          ),
          compras_usuarios!inner (
            users!inner (
              id,
              user_name
            )
          )
        `
        )
        .eq("compras_usuarios.users.user_name", username)
        .is("dtFim", null)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateItensCompra(itemCompraId, updates) {
    try {
      const { data, error } = await supabase
        .from("compras_itens")
        .update(updates)
        .eq("id", itemCompraId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async updateItensCompraEmLote(itens) {
    try {
      const { data, error } = await supabase
        .from("compras_itens")
        .upsert(
          itens.map((item) => ({
            id: item.id,
            confirmed: item.confirmed,
            falta: item.falta,
            qt: item.qt,
            id_produto: item.produtos.id,
            id_compras: item.id_compras,
          }))
        )
        .select();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Erro ao atualizar itens:", error);
      throw error;
    }
  },

  async deleteProduto(idProduto) {
    try {
      const { error } = await supabase
        .from("compras_itens")
        .delete()
        .eq("id", idProduto);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },
};
