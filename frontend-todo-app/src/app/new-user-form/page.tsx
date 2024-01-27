"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomAlert from '../../components/CustomAlert';
import { registerUser } from '../../services/userApi';

export default function NewUserForm(){
  const router = useRouter();
  const [newUserName, setNewUserName] = useState<string>('')
  const [newUserEmail, setNewUserEmail] = useState<string>('')
  const [newUserPassword, setNewUserPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleCreateNewUser(e: React.SyntheticEvent) {
    e.preventDefault();

    if(newUserName.length === 0) {
      setError("Please enter a valid user name");
      setTimeout(() => {
        setError(null)
      }, 1500);
      return
    }
    if(newUserPassword.length === 0) {
      setError("Please enter a valid password");
      setTimeout(() => {
        setError(null)
      }, 1500);
      return
    }
    if(newUserEmail.length === 0 || !isValidEmail(newUserEmail)) {
      setError("Please enter a valid email");
      setTimeout(() => {
        setError(null)  
      }, 1500);
      return
    }
    
    const {error} = await registerUser(newUserName, newUserPassword, newUserEmail);

    if(error) {
      error?.error ===  "Email already exist" ? setError(error.error) : setError("Something went wrong, please try again");
      setTimeout(() => {
        setError(null)  
      }, 1500);
      return
    }

    setSuccess("You have been regisregistered successfully, please login");
    setTimeout(() => {
      setSuccess(null);
      router.push("/");
    }, 1500);

  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  return (
    <>
      <main className="formulary__container">
        {error && <CustomAlert message={error} type="error"/> }
        {success && <CustomAlert message={success} type="success"/>}
        <h1 className="formulary__container_title">Sign Up</h1>
        <form onSubmit={handleCreateNewUser}>
          <label className='formulary__label'>
            <h3 className="formulary__title">Username:</h3>  
            <input className="formulary__input" placeholder="Ex: Maria" type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          </label>
          <br/>
          <label>
            <h3 className="formulary__title">Email:</h3>  
            <input className="formulary__input" placeholder="Ex: example@gmail.com" type="text" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} />
          </label>
          <br/>
          <label>
            <h3 className="formulary__title">Password:</h3>
            <input className="formulary__input" placeholder="Ex: 1#ssf@" autoComplete="new-password" type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} />
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