import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 8, // 8 hours
    },
    pages: { signIn: "/login" },
    providers: [
        Credentials({
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                try {
                    const email = credentials?.email as string;
                    const password = credentials?.password as string;
                    if (!email || !password) return null;

                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user) return null;

                    const valid = await bcrypt.compare(password, user.password);
                    if (!valid) return null;

                    return {
                        id: String(user.id),
                        email: user.email,
                        isAdmin: user.isAdmin,
                    };
                } catch (err) {
                    console.error("authorize failed:", err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // Runs on login (user is set) and on every later request (only token is set)
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        // Copies the token fields onto the session object your app reads
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.isAdmin = token.isAdmin as boolean;
            return session;
        },
    },
});