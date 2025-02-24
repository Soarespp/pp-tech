import { categorias } from "@/utils/constantes";
import { supabase } from "../supabase";

export const produtoService = {
  async getProduto(idProduto) {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", idProduto)
        .single();
      if (error) throw error;

      return {
        ...data,
        categoria: categorias.find((cat) => cat.id === data.categoria),
      };
    } catch (error) {
      throw error;
    }
  },

  async getProdutos() {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .select();
      if (error) throw error;

      return data.map((prod) => ({
        ...prod,
        categoria: categorias.find((cat) => cat.id === prod.categoria),
      }));
    } catch (error) {
      throw error;
    }
  },

  async addProduto(dataInsert) {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .insert([dataInsert]);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },

  async updateProduto(itemId, updates) {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .update(updates)
        .eq("id", itemId);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },

  async deleteItem(itemId) {
    try {
      const { error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", itemId);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },
};
