async function api(endpoint, method, body, headers) {
  const results = await fetch(
    process.env.REACT_APP_API_URL + endpoint,
    {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
    }
  );
  if (results.ok && results.status !== 204) return await results.json();
  else return results;
}

api.GET    = async (endpoint,       headers) => await api(endpoint, 'GET',    undefined, headers);
api.PATCH  = async (endpoint, body, headers) => await api(endpoint, 'PATCH',  body,      headers);
api.PUT    = async (endpoint, body, headers) => await api(endpoint, 'PUT',    body,      headers);
api.POST   = async (endpoint, body, headers) => await api(endpoint, 'POST',   body,      headers);
api.DELETE = async (endpoint, body, headers) => await api(endpoint, 'DELETE', body,      headers);

export default api;
