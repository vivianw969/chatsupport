// pages/index.js

import { useRouter } from 'next/router';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the AI Chat App
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => router.push('/signup')} fullWidth>
          Sign Up
        </Button>
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={() => router.push('/login')} fullWidth>
          Log In
        </Button>
      </Box>
    </Container>
  );
}
