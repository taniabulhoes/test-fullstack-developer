"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUser } from '../services/userApi';
import '../styles/styles.scss';

// import { useAppContext } from '../context';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // const {user} = useAppContext();
  
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { success, data, error } = await loginUser(username, password);

    if (success) {
      console.log('Login successful');
      console.log(data);
      // Save token or perform other actions on successful login
      router.push('/task-list'); // Redirect to dashboard or any other page
    } else {
      console.error('Login failed:', error);
    }
  };

  return (
    <main>
      <h1>Login</h1>
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
        <Link href={''}><h4>Sign up</h4></Link>

      </div>

    </main>
  );
}