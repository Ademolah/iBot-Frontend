import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tenant, setTenant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Warm boot check: verify if an active session key exists on load
    const storedTenant = localStorage.getItem('ibot_tenant_profile');
    const storedToken = localStorage.getItem('ibot_auth_token');

    if (storedTenant && storedToken) {
      setTenant(JSON.parse(storedTenant));
    }
    setIsLoading(false);
  }, []);

  const login = (token, tenantData) => {
    localStorage.setItem('ibot_auth_token', token);
    localStorage.setItem('ibot_tenant_profile', JSON.stringify(tenantData));
    setTenant(tenantData);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('ibot_auth_token');
    localStorage.removeItem('ibot_tenant_profile');
    setTenant(null);
  };

  return (
    <AuthContext.Provider value={{ 
      tenant, 
      isLoading, 
      isAuthModalOpen, 
      setIsAuthModalOpen, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
