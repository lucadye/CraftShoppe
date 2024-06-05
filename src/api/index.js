async function api(endpoint) {
  const results = await fetch(process.env.REACT_APP_API_URL + endpoint);
  return await results.json();
}

export default api;
