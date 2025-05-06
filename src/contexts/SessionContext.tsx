
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email?: string;
  username?: string;
  avatar?: string;
}

interface SessionContextType {
  session: {
    user: User | null;
  } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  user: null
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<{ user: User | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        if (data && data.session) {
          const userData = {
            id: data.session.user.id,
            email: data.session.user.email,
            username: data.session.user.user_metadata?.username || data.session.user.email?.split('@')[0],
            avatar: data.session.user.user_metadata?.avatar_url
          };
          
          setUser(userData);
          setSession({ user: userData });
        }
      } catch (error) {
        console.error('Error in session check:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
          avatar: session.user.user_metadata?.avatar_url
        };
        
        setUser(userData);
        setSession({ user: userData });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  return (
    <SessionContext.Provider value={{
      session,
      loading,
      signIn,
      signOut,
      user
    }}>
      {children}
    </SessionContext.Provider>
  );
};
