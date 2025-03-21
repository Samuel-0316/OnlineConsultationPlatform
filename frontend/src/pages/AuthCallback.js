import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NhostClient } from '@nhost/nhost-js';

// Initialize Nhost client
const nhost = new NhostClient({
  subdomain: 'tjoduzeputbseydstwij',
  region: 'ap-south-1'
});

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    // Add a small delay before processing to allow any in-progress token operations to complete
    const delay = retryCount * 1000; // Increase delay with each retry
    
    const handleAuthCallback = async () => {
      try {
        // Log the current URL to debug the OAuth callback parameters
        console.log('Callback URL:', window.location.href);
        console.log('Retry count:', retryCount);
        
        // Extract token from URL if present (for OAuth callbacks)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check if the URL contains an access token or state param that indicates OAuth
        const hasOAuthParams = hashParams.has('access_token') || 
                              urlParams.has('state') || 
                              hashParams.has('id_token');
        
        console.log('Has OAuth params:', hasOAuthParams);
        
        // First check if we're already authenticated
        const { isAuthenticated, isLoading, user: authUser } = nhost.auth.getAuthenticationStatus();
        
        // Wait until auth status is no longer loading
        if (isLoading) {
          console.log('Auth status is still loading, waiting...');
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000);
          return;
        }
        
        console.log('Already authenticated:', isAuthenticated);
        console.log('User from auth status:', authUser);
        
        if (isAuthenticated && authUser) {
          // Already authenticated, just get the user data
          console.log('User already authenticated:', authUser);
          
          // Validate user object before proceeding
          if (!authUser.id) {
            console.error('User object is missing id:', authUser);
            setError('Authentication error: Invalid user data');
            setTimeout(() => navigate('/login'), 3000);
            return;
          }
          
          handleSuccessfulAuth(authUser);
          return;
        }
        
        // Try getting a session without refreshing if we already attempted a refresh
        if (retryCount > 0 && hasOAuthParams) {
          // Custom handling for refresher-already-running error
          // Just check if authentication succeeded without doing a refresh
          const { isAuthenticated, user } = nhost.auth.getAuthenticationStatus();
          
          if (isAuthenticated && user) {
            console.log('Authentication successful without refresh:', user);
            handleSuccessfulAuth(user);
            return;
          }
        }
        
        // Try to get user session - try a different approach depending on the URL parameters
        let sessionResult;
        
        if (hasOAuthParams) {
          // If we have OAuth params, we should be completing an OAuth flow
          console.log('Attempting to complete OAuth sign-in with URL parameters');
          
          // Wait a moment and check authentication status
          setTimeout(async () => {
            const { isAuthenticated, user: authUser } = nhost.auth.getAuthenticationStatus();
            
            if (isAuthenticated && authUser) {
              console.log('OAuth authentication successful:', authUser);
              
              // Validate user object before proceeding
              if (!authUser.id) {
                console.error('User object is missing id:', authUser);
                setError('Authentication error: Invalid user data');
                setTimeout(() => navigate('/login'), 3000);
                return;
              }
              
              handleSuccessfulAuth(authUser);
            } else if (retryCount < maxRetries) {
              // Retry a few times
              console.log('Authentication not complete yet, retrying...');
              setRetryCount(prev => prev + 1);
            } else {
              setError('Authentication failed after multiple attempts. Please try signing in again.');
              setTimeout(() => navigate('/login'), 3000);
            }
          }, 2000); // Wait 2 seconds
          
          return;
        } else {
          // Regular session refresh
          console.log('Attempting regular session refresh');
          sessionResult = await nhost.auth.refreshSession();
        }
        
        const { session, error: sessionError } = sessionResult || {};
        
        // Log session and errors for debugging
        console.log('Session:', session);
        console.log('Session error:', sessionError);
        
        if (sessionError) {
          // Handle the specific "refresher-already-running" error
          if (sessionError.error === 'refresher-already-running') {
            console.log('Token refresher already running, waiting to retry...');
            
            if (retryCount < maxRetries) {
              // Retry with an increasing delay
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, 1500); // Wait 1.5 seconds before retrying
              return;
            } else {
              // After max retries, try to see if we're authenticated anyway
              const { isAuthenticated, user } = nhost.auth.getAuthenticationStatus();
              
              if (isAuthenticated && user) {
                console.log('Authentication successful after retries:', user);
                handleSuccessfulAuth(user);
                return;
              }
            }
          }
          
          console.error('Session error:', sessionError);
          setError(`Authentication error: ${sessionError.message}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        if (session && session.user) {
          console.log('Authentication successful:', session.user);
          
          // Validate user object before proceeding
          if (!session.user.id) {
            console.error('User object is missing id:', session.user);
            setError('Authentication error: Invalid user data');
            setTimeout(() => navigate('/login'), 3000);
            return;
          }
          
          handleSuccessfulAuth(session.user);
        } else {
          // Not authenticated
          setError('Authentication failed. No valid session found.');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        setError(`Authentication error: ${error.message}`);
        setTimeout(() => navigate('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    // Updated helper function to handle successful authentication with validation
    const handleSuccessfulAuth = async (user) => {
      // Validate user object
      if (!user || typeof user !== 'object') {
        console.error('Invalid user object:', user);
        setError('Authentication error: Invalid user data');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }
      
      // Make sure all required fields exist
      const userId = user.id || user.uid || user.userId;
      const userEmail = user.email;
      const userName = user.displayName || user.name || (userEmail ? userEmail.split('@')[0] : 'User');
      
      if (!userId || !userEmail) {
        console.error('User object missing required fields:', user);
        setError('Authentication error: Incomplete user data');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }
      
      try {
        // Always register/validate with backend regardless of auth mode
        console.log('Validating OAuth user with backend...');
        const response = await fetch('http://localhost:5000/register-oauth-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            name: userName,
            email: userEmail,
            authProvider: 'google'
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Backend validation failed:', errorData);
          setError(`Authentication error: ${errorData.message || 'Failed to validate with server'}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        const data = await response.json();
        console.log('Backend validation successful:', data);
        
        // Use the user data from the backend
        const userData = data.user || {
          _id: userId,
          name: userName,
          email: userEmail,
          authProvider: 'google'
        };
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Clear authMode
        localStorage.removeItem('authMode');
        
        // Navigate back to appropriate page
        const returnUrl = localStorage.getItem('authReturnUrl') || '/dashboard';
        localStorage.removeItem('authReturnUrl'); // Clean up
        navigate(returnUrl);
      } catch (error) {
        console.error('Error validating with backend:', error);
        setError(`Authentication error: Unable to validate with server (${error.message})`);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    // Add delay before processing to avoid concurrent refreshes
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, delay);
    
    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  }, [navigate, retryCount]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #3498db',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 2s linear infinite'
          }}></div>
        </div>
        <h2>Processing your authentication...</h2>
        <p>Please wait while we complete the process.{retryCount > 0 ? ` (Attempt ${retryCount + 1})` : ''}</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    // Log additional debug information when an error occurs
    console.error('Authentication error details:', {
      error,
      url: window.location.href,
      urlParams: new URLSearchParams(window.location.search),
      hashParams: window.location.hash ? new URLSearchParams(window.location.hash.substring(1)) : null
    });
    
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{ color: 'red' }}>Authentication Error</h2>
        <p>{error}</p>
        <p>Redirecting you back to the login page...</p>
        <button 
          onClick={() => navigate('/login')} 
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return null;
};

export default AuthCallback; 