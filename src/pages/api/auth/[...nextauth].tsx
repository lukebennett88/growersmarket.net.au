import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Providers.Email({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],

  // Set debug to `true` to enable debug messages for authentication and database operations.
  debug: process.env.NODE_ENV === 'development',

  // A random string used to hash tokens, sign cookies and generate crytographic keys.
  secret: process.env.AUTH_SECRET,

  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: process.env.JWT_SECRET,

    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  // Configure your NextAuth.js to use the Prisma adapter:
  adapter: Adapters.Prisma.Adapter({ prisma }),

  pages: {
    signIn: '/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: null, // If set, new users will be directed here on first sign in
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
