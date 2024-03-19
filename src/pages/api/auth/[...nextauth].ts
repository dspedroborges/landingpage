import prisma from "@/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const bcrypt = require('bcryptjs')

export async function encryptPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error('Error trying to encrypt password.');
    }
  }

async function checkEncryptedPassword(password: string, hash: string) {
    try {
        const match = await bcrypt.compare(password, hash)
        return match;
    } catch (error) {
        throw new Error('Erro ao verificar a senha')
    }
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials: any, req: any) => {
                const { username, password } = credentials as { username: string, password: string }

                const admin = await prisma.user.findUnique({
                    where: { username: "admin" }
                })

                if (!admin) {
                    await prisma.user.create({
                        data: {
                            username: "admin",
                            password: await encryptPassword('admin'),
                            role: 'ADMIN',
                            admin: {
                                create: {}
                            }
                        }
                    })
                }

                const user = await prisma.user.findUnique({
                    where: { username }
                });

                if (user?.role === "ADMIN") {
                    return { id: String(user.id), name: username, email: "" };
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/sistema/login'
    }
}

export { authOptions }
export default NextAuth(authOptions)
