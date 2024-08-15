async function rawFetch(endpoint, method, body, headers) {
  return await fetch(
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
}

async function parse(response) {
  if (response.ok && response.status !== 204) return await response.json();
  else return response;
}

async function api(endpoint, method, body, headers, raw) {
  let results = await rawFetch(endpoint, method, body, headers);
  if (raw) return results;
  return await parse(results);
}

api.raw    = rawFetch;
api.parse  = parse;
api.GET    = async (endpoint,       headers, raw) => await api(endpoint, 'GET',    undefined, headers, raw);
api.PATCH  = async (endpoint, body, headers, raw) => await api(endpoint, 'PATCH',  body,      headers, raw);
api.PUT    = async (endpoint, body, headers, raw) => await api(endpoint, 'PUT',    body,      headers, raw);
api.POST   = async (endpoint, body, headers, raw) => await api(endpoint, 'POST',   body,      headers, raw);
api.DELETE = async (endpoint, body, headers, raw) => await api(endpoint, 'DELETE', body,      headers, raw);

export default api;
