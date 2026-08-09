import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@auth/sequelize-adapter";
import sequelize from "./lib/db";
import { User, Account } from "./models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Le pasamos tu instancia de Sequelize y le decimos qué modelos usar
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.models.User as any,
      Account: sequelize.models.Account as any,
    },
  }),
  // Estrategia JWT: más rápida, no satura la base de datos con sesiones
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Inyectamos el ID del usuario de la BD en el token para usarlo en el backend
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
