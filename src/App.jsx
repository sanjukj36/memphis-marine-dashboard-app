import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import { useSelector } from 'react-redux';
import SingleCoinDetails from './pages/SingleCoinDetails';
import CryptocurrencyCoins from './pages/CryptocurrencyCoins';
import WeatherSearch from './pages/WeatherSearch';
import UserList from './pages/UserList';
import Dashboard from './pages/Dashboard';

function App() {
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard isAdmin={isAdmin} /> : <LoginForm  />} />
        <Route path="/login" element={<LoginForm  />} />
        <Route path="/register" element={<RegistrationForm  />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard isAdmin={isAdmin} /> : <LoginForm  />} />
        <Route path="/coin/:coinId" element={isLoggedIn ? <SingleCoinDetails /> : <LoginForm  />} />
        <Route path="/crypto-coins" element={isLoggedIn ? <CryptocurrencyCoins /> : <LoginForm  />} />
        <Route path="/weather" element={isLoggedIn ? <WeatherSearch /> : <LoginForm  />} />
        <Route path="/user-list" element={isLoggedIn & isAdmin ? <UserList /> : <LoginForm  />} />

      </Routes>
    </Router>
  );
}

export default App;
