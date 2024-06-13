async function api(endpoint, method, body) {
  body = JSON.stringify(body);
  const results = await fetch(
    process.env.REACT_APP_API_URL + endpoint,
    { method, body }
  );
  if (results.ok) return await results.json();
  else return results;
}

api.GET    = async (endpoint      ) => await api(endpoint, 'GET'         );
api.PATCH  = async (endpoint, body) => await api(endpoint, 'PATCH',  body);
api.PUT    = async (endpoint, body) => await api(endpoint, 'PUT',    body);
api.POST   = async (endpoint, body) => await api(endpoint, 'POST',   body);
api.DELETE = async (endpoint, body) => await api(endpoint, 'DELETE', body);

export default api;
