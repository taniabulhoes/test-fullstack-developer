"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '../context';
import { loginUser } from '../services/userApi';
import '../styles/styles.scss';

export default function Home() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { success, data } = await loginUser(username, password);

    if (success) {
      login(data.token);

      router.push('/task-list');
    } else {
      setError('Invalid username or password, please try again');

      setTimeout(() => {
        setError(null)
      }, 1500);
    }
  };

  return (
    <>
      <main className="formulary__container">
        <h1 className="formulary__container_title">Sign In</h1>

        {error && <div>{error}</div>}
        
        <form onSubmit={handleLogin} className="loginPage__formContainer formulary" >
          <label className="formulary__label">
            <h3 className="formulary__title">Username:</h3>          
            <input autoComplete="off" className="formulary__input" placeholder='Ex: Jonas' type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="formulary__label">
            <h3 className="formulary__title">Password:</h3>          
            <input autoComplete="new-password" className="formulary__input" type="password" placeholder='Ex: 1@YsxxU' value={password} onChange={(e) => setPassword(e.target.value)} />
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