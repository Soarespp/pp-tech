import { supabase } from "../supabase";

export const itemService = {
  async addItem({ listId, name, quantity }) {
    try {
      const { data, error } = await supabase
        .from("items")
        .insert([{ list_id: listId, name, quantity }])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async updateItem({ itemId, updates }) {
    try {
      const { data, error } = await supabase
        .from("items")
        .update(updates)
        .eq("id", itemId)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteItem(itemId) {
    try {
      const { error } = await supabase.from("items").delete().eq("id", itemId);
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  },
};
