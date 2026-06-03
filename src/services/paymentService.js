import api from "./api";

export const createCheckoutSession = async (
  orderId
) => {

  const token =
    localStorage.getItem(
      "token"
    );

  return await api.post(
    "/payment/create-checkout-session",
    {
      orderId,
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};