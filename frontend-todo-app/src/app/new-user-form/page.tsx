"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomAlert, { defaultAlert } from '../../components/CustomAlert';
import { registerUser } from '../../services/userApi';
import handleChangeInput from '../../utils/handleChangeInput';
import { isAnyFormInputsEmpty, isValidEmail } from '../../utils/validateField';

export default function NewUserForm(){
  const router = useRouter();
  const [newUser, setNewUser] = useState({name: '', email: '', password: ''})
  const [alertComponent, setAlertComponent] = useState<CustomAlertProps>(defaultAlert);

  async function handleCreateNewUser(e: React.SyntheticEvent) {
    e.preventDefault();

    const {name, email, password} = newUser;

    try {
      if(!isValidEmail(email) || isAnyFormInputsEmpty([email, password, name])) {
        setAlertComponent((prev: CustomAlertProps) => ({
          ...prev,
          open: true,
          message: "Please enter a valid field",
          type: 'error'
        }));

        return;
      }
       
      const { success, error } = await registerUser(name, password, email);

      if(success) {
        setAlertComponent((prev: CustomAlertProps) => ({
          ...prev,
          open: true,
          message: "You have been regisregistered successfully, please login",
          type: 'success'
        }));
    
        return router.push("/");
      }

      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: error,
        type: 'error'
      }));

    } catch (error: any) {
      setAlertComponent((prev: CustomAlertProps) => ({
        ...prev,
        open: true,
        message: error,
        type: 'error'
      }));
    }    
  }

  return (
    <>
      <main className="formulary__container">
        {alertComponent.open && (
          <CustomAlert
            message={alertComponent.message}
            type={alertComponent.type}
            setAlertComponent={setAlertComponent}
            open={alertComponent.open}
          />
        )}
        <h1 className="formulary__container_title">Sign Up</h1>
        <form onSubmit={handleCreateNewUser}>
          <label className='formulary__label'>
            <h3 className="formulary__title">Username:</h3>  
            <input
              name="name"
              className="formulary__input"
              placeholder="Ex: Maria"
              type="text"
              value={newUser.name}
              onChange={(e) => handleChangeInput(e, setNewUser)}
            />
          </label>
          <label className='formulary__label'>
            <h3 className="formulary__title">Email:</h3>  
            <input
              name='email'
              className="formulary__input"
              placeholder="Ex: example@gmail.com"
              type="text"
              value={newUser.email}
              onChange={(e) => handleChangeInput(e, setNewUser)}
            />
          </label>
          <label className='formulary__label'>
            <h3 className="formulary__title">Password:</h3>
            <input
              name='password'
              className="formulary__input"
              placeholder="Ex: 1#ssf@"
              autoComplete="new-password"
              type="password"
              value={newUser.password}
              onChange={(e) => handleChangeInput(e, setNewUser)}
            />
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