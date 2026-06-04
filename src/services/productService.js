import api from "./api";

export const getProducts =
  async (
    search = "",
    categoryId = ""
  ) => {

    return await api.get(
      `/products/list?search=${search}&categoryId=${categoryId}`
    );

  };