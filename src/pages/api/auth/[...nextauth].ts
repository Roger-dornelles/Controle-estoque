import getUser from '@/service/getUser';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const optionsAuth = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (credentials != null && credentials.email && credentials.password) {
          const user = await getUser(credentials.email, credentials.password);

          if (user != null) {
            return {
              user,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      let user = {
        token: token.user.user.user.token,
        id: token.user.user.id,
      };

      if (token) {
        session.user = user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
  },
};

export default NextAuth(optionsAuth);
