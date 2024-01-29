"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../context';
import { loginUser } from '../services/userApi';
import '../styles/styles.scss';
import handleChangeInput from '../utils/handleChangeInput';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [userLogin, setUserLogin] = useState<UserLoginProps>({email: '', password: ''})
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {email, password} = userLogin;

    const { success, data } = await loginUser(email, password);

    if (success) {
      login(data.token);

      router.push('/task-list');
    } else {
      setError('Invalid e-mail or password, please try again');

      setTimeout(() => {
        setError(null)
      }, 1500);
    }
  };

  return (
    <>
      <main className="formulary__container">
        <h1 className="formulary__container_title">Sign In</h1>

        {error && <CustomAlert message={error} type="error"/> }
        
        <form autoComplete="off" onSubmit={handleLogin} className="loginPage__formContainer formulary" >
          <label className="formulary__label">
            <h3 className="formulary__title">Email:</h3>
            <input
              autoComplete="new-password"
              className="formulary__input"
              placeholder='Ex: email@email.com'
              type="email"
              name="email"
              value={userLogin.email}
              onChange={(e) => handleChangeInput(e, setUserLogin)}
            />
          </label>
          <label className="formulary__label">
            <h3 className="formulary__title">Password:</h3>          
            <input
              autoComplete="new-password"
              className="formulary__input"
              type="password"
              name="password"
              placeholder='Ex: 1@YsxxU'
              value={userLogin.password}
              onChange={(e) => handleChangeInput(e, setUserLogin)}
            />
          </label>
          <button className="formulary__button" type="submit">Login</button>
        </form>
      </main>
      <Link href={'/new-user-form'} className='loginPage__newUser'>
        <h4>Don't have account?</h4>
        <h4 className='loginPage__newUser_signUp'>Sign up</h4>
      </Link>
    </>
    
  );
}