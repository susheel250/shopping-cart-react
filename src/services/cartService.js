import api from "./api";

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  return await api.post(
    "/cart/add",
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getCartCount = async () => {
  const token = localStorage.getItem("token");
  if(!token) return 0;
  try {
    const response = await api.get("/cart/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.count;
  } catch (error) {
    console.log("Error fetching cart count:", error);
    return 0;
  }
};

export const getCartItems = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.get("/cart/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error fetching cart items:", error);
    return [];
  }
};

export const removeCartItem = async (itemId) => {
  const token = localStorage.getItem("token");

  try {
    await api.delete(`/cart/remove/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error removing cart item:", error);
  }
};
