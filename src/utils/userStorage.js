const USER_ID_KEY = "stepper_user_id";

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

export const removeUserId = () => {
  localStorage.removeItem(USER_ID_KEY);
};
