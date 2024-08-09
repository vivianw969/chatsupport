// pages/loggedin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

export default function LoggedIn() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setLoading(false);
      } else {
        // User is signed out, redirect to login page
        router.push('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4">You are logged in</Typography>
      {user && <Typography variant="body1">Welcome, {user.email}!</Typography>}
    </Container>
  );
}
