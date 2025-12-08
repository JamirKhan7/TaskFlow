import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<h1>Dashboard (Protected)</h1>} />
          {/* Default redirect to login for now */}
          <Route path="*" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
