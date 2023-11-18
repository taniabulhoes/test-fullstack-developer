import { NextAuthOptions } from "next-auth";
import { JWT, decode, encode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.BASE_URL || "http://localhost:7777";


async function refreshToken(token: JWT): Promise<JWT>{

  const res = await fetch(`${BASE_URL}/token/refresh`, {
    method: "PATCH",
    headers: {
        Authorization: `Bearer ${token.refreshToken}` 
    },    
    body: JSON.stringify({
        none: ''
    }),
  });

  const response = await res.json();

  return {
    ...token,
    expiresIn: token.expiresIn,
    tokenAccess: response.tokenAccess,
    refreshToken: response.refreshToken
  }
}

const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: { encode, decode },  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {

        if (!credentials?.username || !credentials?.password) return null;

        const response = await fetch(`${BASE_URL}/sessions`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
          }),
      });

      const user = await response.json();

      if (response.ok && user) {
          return user;
      } else return null;

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) return { ...token, ...user };

      if(new Date().getTime() < token.expiresIn) return token;

      const newToken = await refreshToken(token)

      return newToken
    },
    
    async session({ session, token }) {
      session.user = token.user;
      session.tokenAccess = token.tokenAccess;
      session.refreshToken = token.refreshToken
      
      return session
    },
  } , 
  pages: {
    signIn: "/signIn",
  },  
};

export {nextAuthOptions}