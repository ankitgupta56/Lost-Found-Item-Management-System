import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { loginUser } from '../api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await loginUser(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Login onSubmit={handleLogin} loading={loading} />
      {error && <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
