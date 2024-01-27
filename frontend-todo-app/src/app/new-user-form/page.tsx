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
    <>
      <main className="formulary__container">
        <h1 className="formulary__container_title">Sign Up</h1>
        <form onSubmit={handleCreateNewUser}>
          <label className='formulary__label'>
            <h3 className="formulary__title">Username:</h3>  
            <input className="formulary__input" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          </label>
          <br/>
          <label>
            <h3 className="formulary__title">Email:</h3>  
            <input className="formulary__input" type="text" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
          </label>
          <br/>
          <label>
            <h3 className="formulary__title">Password:</h3>
            <input className="formulary__input" type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} />
          </label>
          <div className="newUser__buttons_container">
            <button className="formulary__button" type="submit">Register</button>
            <a className="formulary__button" href='/' type="button" >Login</a>
          </div>
        </form>
      </main>
    </>
  )
}