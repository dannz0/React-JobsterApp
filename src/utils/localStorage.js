export const addUserToLocalStorage = function (user) {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = function () {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = function () {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;

  return user;
};
