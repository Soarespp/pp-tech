import { formatListaCompras } from "@/utils/formaters/listaCompras";
import { supabase } from "../supabase";

export const listsCompras = {
  async insertCompras() {
    try {
      const { data, error } = await supabase
        .from("compras")
        .insert([{ dtFim: null }])
        .select() // Adiciona select() para retornar o registro inserido
        .single();

      if (error) throw error;
      return data;
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

  async getListComprasCompartilhadas(username) {
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
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },
  async getHistoricoCompras(username) {
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
        .not("dtFim", "is", null)
        .order("dtFim", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateCompras(listId, updates) {
    try {
      const { data, error } = await supabase
        .from("compras")
        .update(updates)
        .eq("id", listId)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async cloneComprasItens(
    idBase,
    idClone,
    idUsuario,
    idFinalizaCompras = NULL
  ) {
    try {
      const { data, error } = await supabase.rpc("clone_compras_itens", {
        idbase: idBase,
        idclone: idClone,
        idusuario: idUsuario,
        finalizarcompras: idFinalizaCompras,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao clonar itens:", error);
      throw error;
    }
  },

  async deleteList(listId) {
    try {
      const { error } = await supabase.from("lists").delete().eq("id", listId);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },
};
