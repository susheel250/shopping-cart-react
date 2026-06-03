import api from "./api";

export const createOrder =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await api.post(

      "/orders/create",

      {},

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  };

export const getMyOrders =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await api.get(

      "/order/my-orders",

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  };