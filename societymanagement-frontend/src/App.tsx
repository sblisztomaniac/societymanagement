import { AppProvider } from '@/context/AppContext';
import { AppRouter } from '@/components/AppRouter';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;