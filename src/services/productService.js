import api from "./api";

export const getProducts =
  async (
    search = "",
    categoryId = "",
    page = 1
  ) => {

    return await api.get(
      `/products/list?search=${search}&categoryId=${categoryId}&page=${page}`
    );

  };