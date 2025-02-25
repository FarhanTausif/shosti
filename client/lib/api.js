import jwtDecode from 'jwt-decode';

// Check if token is expired
const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Create authenticated fetch wrapper
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('accessToken');
  
  // Handle missing or invalid token
  if (!token || !isTokenValid(token)) {
    localStorage.removeItem('accessToken');
    window.location.href = '/admin';
    throw new Error('Session expired. Please login again.');
  }

  // Set headers
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // Add timeout support
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 401 unauthorized responses
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/admin';
      throw new Error('Session expired. Please login again.');
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// Role validation helper
export const validateAdminRole = (requiredRole) => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded.role === requiredRole;
  } catch (error) {
    return false;
  }
};