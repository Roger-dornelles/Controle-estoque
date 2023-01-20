import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import getUser from '@/service/getUser';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.email && credentials.password) {
          const user = await getUser(credentials.email, credentials.password);

          const newUser = {
            email: credentials.email,
            password: credentials.password,
            token: user?.data.token,
          };

          if (user) {
            return newUser;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      console.log('session ', session);
      console.log('session token ', token);

      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);
