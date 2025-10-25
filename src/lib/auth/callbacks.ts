export const authCallbacks = {
  jwt({ token, user }: { token: any; user?: any }) {
    if (user) token.id = user.id;
    return token;
  },
  session({ session, token }: { session: any; token: any }) {
    if (token && session.user) session.user.id = token.id as string;
    return session;
  },
};
