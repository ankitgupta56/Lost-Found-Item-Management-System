import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register from '../components/Register';
import { registerUser } from '../api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const response = await registerUser(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Register onSubmit={handleRegister} loading={loading} />
      {error && <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
