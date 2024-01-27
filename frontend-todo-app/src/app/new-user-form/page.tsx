"use client";

import { useState } from 'react';
import { registerUser } from '../../services/userApi';

export default function NewUserForm(){
  const [newUserName, setNewUserName] = useState<string>('')
  const [newUserEmail, setNewUserEmail] = useState<string>('')
  const [newUserPassword, setNewUserPassword] = useState<string>('')

  async function handleCreateNewUser() {
    await registerUser(newUserName, newUserPassword, newUserEmail);
  }

  return (
    <main>
      <form onSubmit={handleCreateNewUser}>
        <label>
          User Name
          <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
        </label>
        <br/>
        <label>
          User Email
          <input type="text" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
        </label>
        <br/>
        <label>
          User Password
          <input type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <a href='/'>Back to Login</a>
    </main>
  )
}