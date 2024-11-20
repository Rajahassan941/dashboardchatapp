import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../services/AuthService';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await AuthService.login(data);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid login credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
