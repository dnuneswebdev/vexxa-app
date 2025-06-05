import NextAuth from "next-auth";
import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {SupabaseAdapter} from "@next-auth/supabase-adapter";
import {supabaseAdmin} from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const {data, error} = await supabaseAdmin.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error("Supabase auth error:", error.message);
            return null;
          }

          const user = data.user;

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split("@")[0],
            image: user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({token, user, account}) {
      if (account && user) {
        token.userId = user.id;
        token.sessionStart = Date.now();

        const {data} = await supabaseAdmin.auth.getSession();
        token.accessToken = data?.session?.access_token || "";
      }

      if (token.sessionStart) {
        const sessionAge = Date.now() - (token.sessionStart as number);
        const maxAge = 8 * 60 * 60 * 1000;

        if (sessionAge > maxAge) return {};
      }

      return token;
    },
    async session({session, token}) {
      if (token.userId) {
        session.user.id = token.userId as string;
      }
      session.accessToken = token.accessToken as string;
      session.sessionStart = token.sessionStart as number;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
    updateAge: 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
