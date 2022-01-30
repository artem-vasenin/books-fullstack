export default ({ $axios, store }, inject) => {
  const headers = { 'Content-Type': 'application/json' };
  if (store.getters.token) {
    headers.Authorization = `Bearer ${store.getters.token}`;
  }
  const api = $axios.create({
    headers,
    baseURL: process.env.BASE_URL,
    timeout: 60000,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  inject('api', api);
};
