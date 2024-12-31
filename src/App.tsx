import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PopulateTestData from './components/dev/PopulateTestData';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Route>
          </Route>
        </Routes>
        <PopulateTestData />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;