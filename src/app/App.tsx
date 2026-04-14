import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Accueil from './pages/Accueil';
import Dashboard from './pages/Dashboard';
import Production from './pages/Production';
import Stocks from './pages/Stocks';
import Marketplace from './pages/Marketplace';
import Commandes from './pages/Commandes';
import Messages from './pages/Messages';
import Statistiques from './pages/Statistiques';
import Profil from './pages/Profil';
import Parametres from './pages/Parametres';
import Aide from './pages/Aide';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Commenté pour rendre toutes les pages publiques (accès sans connexion)
  // const { user } = useApp();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useApp();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/accueil" replace /> : <Login />} />

      <Route
        path="/accueil"
        element={
          <ProtectedRoute>
            <Layout>
              <Accueil />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/production"
        element={
          <ProtectedRoute>
            <Layout>
              <Production />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/stocks"
        element={
          <ProtectedRoute>
            <Layout>
              <Stocks />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <Layout>
              <Marketplace />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/commandes"
        element={
          <ProtectedRoute>
            <Layout>
              <Commandes />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Layout>
              <Messages />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistiques"
        element={
          <ProtectedRoute>
            <Layout>
              <Statistiques />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <Layout>
              <Profil />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/parametres"
        element={
          <ProtectedRoute>
            <Layout>
              <Parametres />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/aide"
        element={
          <ProtectedRoute>
            <Layout>
              <Aide />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/accueil" replace />} />
      <Route path="*" element={<Navigate to="/accueil" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
