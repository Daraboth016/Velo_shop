import { useState, useEffect } from 'react';

function useAuth() {
  const [user, setUser] = useState(null);

    useEffect(() => {
      // Simulate an API call to check if the user is logged in
      const checkAuthStatus = async () => {
        try {
          const response = await fetch('/api/auth/status');
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error checking authentication status:', error);
        }
      };

      checkAuthStatus();
    }, []);

  return { user };
}