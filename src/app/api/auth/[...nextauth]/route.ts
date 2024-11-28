import NextAuth from "next-auth"
import { NextOptions } from '@/utils/NextAuth/AuthOptions';

const handler = NextAuth(NextOptions)

export { handler as GET, handler as POST }