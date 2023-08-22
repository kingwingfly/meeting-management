import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your username" },
                password: { label: "Password", type: "password", placeholder: "your password" }
            },
            async authorize(credentials, req) {
                const password = await sql`SELECT password FROM Users WHERE Name=${credentials?.username} LIMIT 1;`;
                if (credentials?.password === password.rows[0].password) {
                    const user = { id: "0", name: credentials?.username }
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token }) {
            return token
        },
    },
}