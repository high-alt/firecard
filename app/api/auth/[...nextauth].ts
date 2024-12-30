import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { AuthOptions, User } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOpts = NextAuth({
  session:{
    strategy:'jwt'
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
    }),
    CredentialsProvider({
      name:"Credentials",
      credentials:{
        username:{ label: "Username:", type:"text", placeholder:"Enter your username"},
        password:{ label: "Password:", type:"password", placeholder:"Enter your password"},
        
      },
      authorize: async (credentials) => {
        if(!credentials?.username || !credentials.password) throw new Error("Invalid username or password")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password
          }),
          headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        console.log(result)
        // If no error and we have user data, return it
        if (res.ok && result) {
          return result
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
    // Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    // }),
    // Apple({
    //   clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    // }),
  ],
  callbacks: {
  },
  pages: {
    signIn:'/signin'
  }
    
})

export default authOpts