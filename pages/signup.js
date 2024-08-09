// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      // Handle specific error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        default:
          setError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Sign Up
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
          <Button variant="contained" color="primary" onClick={handleSignUp} fullWidth>
            Sign Up
          </Button>
        </Box>
        <Box mt={2}>
          <Typography>
            Already have an account?{' '}
            <Button color="primary" onClick={() => router.push('/login')}>
              Log In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
