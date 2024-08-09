// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/loggedin'); // Redirect to logged in page after successful login
    } catch (error) {
      // Handle specific error codes
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Incorrect email or password');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        default:
          setError('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
            Log In
          </Button>
        </Box>
        <Box mt={2}>
          <Typography>
            Don’t have an account?{' '}
            <Button color="primary" onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
