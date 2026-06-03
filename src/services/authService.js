import api from "../services/api";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  return await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
  

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  return await api.put("/auth/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (data) => {
  const token = localStorage.getItem("token");
  
  return await api.put(
    "/auth/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }   
  );
};