import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import BookingForm from '../src/components/bookingForm';
import BookingList from '../src/components/booking_list';

// Create the navbar component
function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Booking App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Booking Form
        </Button>
        <Button color="inherit" component={Link} to="/listings">
          All Bookings
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Render the App with routing and navbar
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box p={3}>
          <Routes>
            <Route path="/" element={<BookingForm />} />
            <Route path="/listings" element={<BookingList />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  </React.StrictMode>
);


// // Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      },
      (err) => {
        console.log('Service Worker registration failed:', err);
      }
    );
  });
}
