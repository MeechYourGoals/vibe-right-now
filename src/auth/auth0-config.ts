
// Auth0 configuration for web and mobile authentication
export const auth0Config = {
  domain: "your-auth0-domain.auth0.com", // Replace with your Auth0 domain
  clientId: "your-auth0-client-id", // Replace with your Auth0 client ID
  redirectUri: window.location.origin,
  audience: "your-auth0-audience", // Optional - replace if you're using a specific API
  scope: "openid profile email",
  // MCP specific configuration
  usePasskeys: true,
  mobileOptions: {
    useMCP: true,
    mcpRedirectUri: `${window.location.origin}/mcp-callback`
  }
};
