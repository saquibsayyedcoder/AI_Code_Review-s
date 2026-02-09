import API from "./axios";

// Register
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// Login
export const loginUser = async (data) => {
 const res = await API.post("/auth/login", data, {
  headers: { "Content-Type": "application/json" }
});
  return res.data;
};

// Logout
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};
