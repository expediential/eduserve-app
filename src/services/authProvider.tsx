import React, { createContext, useContext, useMemo, useState } from 'react';

export type Session = { email: string; mode: 'demo' };
type AuthContextValue = {
  session: Session | null;
  isSigningIn: boolean;
  signInDemo(email: string, password: string): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Development-only session provider. It deliberately does not accept, store,
 * or submit any EduServe credentials. Replace this with a server-backed,
 * officially authorized provider before enabling production sign-in.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    isSigningIn,
    async signInDemo(email, password) {
      if (!email.trim() || password.length < 4) throw new Error('Enter an email and at least four characters for the demo password.');
      setIsSigningIn(true);
      await new Promise((resolve) => setTimeout(resolve, 450));
      setSession({ email: email.trim().toLowerCase(), mode: 'demo' });
      setIsSigningIn(false);
    },
    signOut() { setSession(null); },
  }), [isSigningIn, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('AuthProvider is required');
  return value;
}
