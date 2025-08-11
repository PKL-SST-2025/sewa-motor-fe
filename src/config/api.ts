// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    // Auth endpoints
    LOGIN: [
      '/api/auth/login',
      '/auth/login', 
      '/api/login',
      '/login'
    ],
    REGISTER: [
      '/api/auth/register',
      '/auth/register',
      '/api/register', 
      '/register'
    ],
    
    // Profile endpoints
    PROFILE_CURRENT: [
      '/api/profils/current',
      '/api/profiles/current',
      '/api/profile/current',
      '/api/user/current',
      '/api/auth/me'
    ],
    
    // Booking endpoints  
    BOOKINGS: [
      '/api/bookings',
      '/api/orders',
      '/api/sewa'
    ],
    BOOKINGS_USER: [
      '/api/bookings/user',
      '/api/orders/user',
      '/api/sewa/user'
    ],
    BOOKINGS_ME: [
      '/api/bookings/me',
      '/api/orders/me', 
      '/api/sewa/me'
    ]
  }
};

// Helper function to try multiple endpoints
export const tryMultipleEndpoints = async (
  endpointList: string[], 
  options: RequestInit = {},
  baseUrl: string = API_CONFIG.BASE_URL
): Promise<Response> => {
  let lastError = '';
  
  for (const endpoint of endpointList) {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log(`Trying endpoint: ${url}`);
      
      const response = await fetch(url, options);
      console.log(`${url} - Response status:`, response.status);
      
      if (response.ok) {
        console.log(`Success with endpoint: ${url}`);
        return response;
      } else {
        const errorData = await response.text();
        console.log(`${url} failed:`, response.status, errorData);
        lastError = `${endpoint}: ${response.status} - ${errorData}`;
      }
    } catch (err) {
      console.log(`Error with ${endpoint}:`, err);
      lastError = `${endpoint}: ${(err as Error).message}`;
    }
  }
  
  throw new Error(`All endpoints failed. Last error: ${lastError}`);
};

// Common headers
export const getAuthHeaders = (token?: string | null) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  const authToken = token || localStorage.getItem('jwt');
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  return headers;
};
