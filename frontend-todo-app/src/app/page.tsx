"use client";

import Link from 'next/link';
import { useState } from 'react';
import '../styles/styles.scss';

// import { useAppContext } from '../context';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const {user} = useAppContext();

  const handleLogin = () => {
    console.log("Fetch to login")
  }
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