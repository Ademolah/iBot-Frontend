import { AuthProvider } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import AuthModal from './context/AuthModal';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function RootViewSwitcher() {
  const { currentScreen } = useNavigation();

  // Dynamically mounts either the public website or your secure cloud dashboard
  return currentScreen === 'dashboard' ? <Dashboard /> : <Home />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        {/* Unified screen content viewport routers */}
        <RootViewSwitcher />
        
        {/* Unified authorization overlay modal panel */}
        <AuthModal />
      </NavigationProvider>
    </AuthProvider>
  );
}
