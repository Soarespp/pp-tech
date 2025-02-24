import { supabase } from "../supabase";

export const UsuarioCompras = {
  async getComprasUsuarios(userId) {
    try {
      const { data, error } = await supabase
        .from("compras_usuarios")
        .select("*")
        .neq("usuario_id", userId)
        .select();
      if (error) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  },

  async insertUsuarioCompras(userCompras) {
    if (userCompras?.length < 1) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from("compras_usuarios")
        .insert(userCompras)
        .select("*")
        .select();

      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },

  async deleteUsuariosCompras(usuerDelete) {
    try {
      if (!Array.isArray(usuerDelete) || usuerDelete.length === 0) {
        return;
      }

      const { data, error } = await supabase
        .from("compras_usuarios")
        .delete()
        .in(
          "usuario_id",
          usuerDelete.map((v) => v.usuario_id)
        )
        .in(
          "compra_id",
          usuerDelete.map((v) => v.compra_id)
        );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Erro ao deletar vínculos:", error);
      throw error;
    }
  },
};
