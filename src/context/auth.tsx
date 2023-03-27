import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import usePersistedState from "@/hooks/usePersistedState";
import { IUser } from "@/types/user";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  isUserLogged: boolean;
  signIn: (payload: SignInRequest) => {};
  signOut: () => void;
  signUp: (payload: SignUpRequest) => {};
  user?: IUser;
  token?: string;
}

interface AuthProviderProps {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [user, setUser] = usePersistedState("user", undefined);
  const isUserLogged = !!Cookies.get("token");

  const signIn = async (payload: SignInRequest) => {
    try {
      const {
        data: { user, token },
      } = await axios.post(`http://localhost:3000/session`, payload);

      Cookies.set("token", token);

      setUser(user);

      router.push("/tasks");
    } catch (error) {
      toast.error("Verifique seu usuário e senha");
    }
  };

  const signOut = () => {
    router.push("/signin");

    Cookies.remove("token");

    localStorage.removeItem("user");
    localStorage.removeItem("tasks");
  };

  const signUp = async (payload: SignUpRequest) => {
    const {
      data: { user, token },
    } = await axios.post(`http://localhost:3000/user`, payload);
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLogged,
        signIn,
        signOut,
        signUp,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthContext provider");
  }

  return context;
}

export { AuthProvider, useAuth };
