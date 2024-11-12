const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export { setSession };

