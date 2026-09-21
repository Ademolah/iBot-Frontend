import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const { tenant } = useAuth();
  // Automatically switch to the internal screen if the user is already logged in
  const [currentScreen, setCurrentScreen] = useState(tenant ? 'dashboard' : 'home');

  return (
    <NavigationContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
