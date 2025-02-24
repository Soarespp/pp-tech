import { supabase } from "../supabase";

export const userService = {
  async getProfile(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async createProfile({ profile }) {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          user_name: profile.user_name,
          nome: profile.nome,
          documento: profile.documento,
          tipo: profile.tipo,
          email: profile.email,
          password: profile.password,
          dt_nascimento: profile.dt_nascimento,
        })
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async updateProfile({ userId, updates }) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select();

      if (error) throw error;

      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async getSharedUsers() {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  },

  async shareList({ listId, userId }) {
    try {
      const { data, error } = await supabase
        .from("shared_lists")
        .insert([{ list_id: listId, user_id: userId }])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },
};
