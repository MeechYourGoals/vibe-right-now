
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const useAuth0Auth = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
  
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };
    
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);
  
  const login = async () => {
    return loginWithRedirect({
      appState: {
        returnTo: window.location.pathname
      },
      // MCP and passkey options for mobile
      authorizationParams: {
        // Additional parameters for mobile connections
        connection: "passkey", // Use passkey when available
        prompt: "login",
      }
    });
  };
  
  const googleLogin = async () => {
    return loginWithRedirect({
      appState: {
        returnTo: window.location.pathname
      },
      authorizationParams: {
        connection: "google-oauth2" // Specify Google connection
      }
    });
  };
  
  const logoutUser = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };
  
  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    googleLogin,
    logout: logoutUser,
    getToken: () => token
  };
};
