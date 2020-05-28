import { http } from "@/config/config";

export const getItems = async function(url, urlParams) {
  let result;
  try {
    if (urlParams) {
      result = await http.get(`${url}?${urlParams}`);
    } else {
      result = await http.get(url);
    }
    if (result.status == 200) {
      if (urlParams) {
        return {
          data: result.data,
          total_items: result.headers["x-total-count"],
        };
      }
      return result.data;
    }
  } catch (error) {
    result = "Problema ao acessar dados, tente novamente mais tarde.";
    return result;
  }
};

export const getItem = async function(url, id) {
  let result;
  try {
    result = await http.get(`${url}/${id}`);
    if (result.status == 200) {
      return result.data;
    }
  } catch (error) {
    result = "Problema ao acessar dados, tente novamente mais tarde.";
    return result;
  }
};

export const createItem = async function(url, itemData) {
  let result;
  try {
    result = await http.post(url, itemData);
    if (result.status == 201 || result.status == 200) {
      return result.data;
    }
  } catch (error) {
    result = "Problema ao cadastrar item, tente novamente.";
    return result;
  }
};

export const updateItem = async function(url, id, itemData) {
  let result;
  try {
    result = await http.put(`${url}/${id}`, itemData);
    if (result.status == 201 || result.status == 200) {
      return result.data;
    }
  } catch (error) {
    result = "Problema ao atualizar item, tente novamente.";
    return result;
  }
};

export const deleteItem = async function(url, id, itemData) {
  let result;
  try {
    result = await http.delete(`${url}/${id}`);
    if (result.status == 201 || result.status == 200) {
      return result.data;
    }
  } catch (error) {
    result = "Problema ao atualizar item, tente novamente.";
    return result;
  }
};

export const saveImages = async function(url, imgs) {
  let result;
  try {
    for (let index = 0; index < imgs.length; index++) {
      result = await http.post(url, imgs[index]);
    }
    if (result.status == 201 || result.status == 200) {
      return result.data;
    }
  } catch (error) {
    result = "Problema ao cadastrar item, tente novamente.";
    return result;
  }
};
