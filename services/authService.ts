
import { LoginCredentials, AuthResponse, User } from '../types';

// This is a mock service. In a real application, this would make API calls to your .NET backend.
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
        const user: User = {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
        };
        // In a real app, this token would be a real JWT from your .NET API
        const token = 'fake-jwt-token.' + btoa(JSON.stringify({ sub: user.id, name: user.name })) + '.signature';
        
        resolve({ user, token });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1500); // Simulate network latency
  });
};

export const logout = (): void => {
  // In a real app, you might want to call a logout endpoint to invalidate the token on the server.
  console.log('User logged out.');
};
