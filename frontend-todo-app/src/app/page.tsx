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
    <main>
      <h1>Login</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div>
        <h4>Don't have account?</h4>
        <Link href={'/new-user-form'}><h4>Sign up</h4></Link>

      </div>

    </main>
  );
}