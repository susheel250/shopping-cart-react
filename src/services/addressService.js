import api from "../services/api";

export const getAddresses =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await api.get(

      "/address/list",

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  };

export const createAddress =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await api.post(

      "/address/create",

      data,

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  };

export const setDefaultAddress =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await api.put(

      `/address/set-default/${id}`,

      {},

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  };