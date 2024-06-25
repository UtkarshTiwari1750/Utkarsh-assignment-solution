import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import VerifyEmail from './pages/VerifyEmail';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Expenses from './components/core/Dashboard/Expenses';
import OpenRoute from './components/core/Auth/OpenRoute';
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <OpenRoute>
            <Home />
          </OpenRoute>
        }
        />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } /> 
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/expenses" element={<Expenses />} />
      
        </Route>

      </Routes>
    </div>
  );
}

export default App;
