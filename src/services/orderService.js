import api from "./api";

export const createOrder = async () => {
  const token = localStorage.getItem("token");

  return await api.post(
    "/orders/create",

    {},

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  return await api.get(
    "/orders/my-orders",

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getOrderById = async (orderId) => {
  const token = localStorage.getItem("token");

  return await api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};