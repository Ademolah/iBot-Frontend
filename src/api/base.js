const BASE_URL = import.meta.env.VITE_API_URL 

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ibot_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || 'Network transaction security failure.');
  }

  return payload;
};
