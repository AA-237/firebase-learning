import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path based on your structure

function BookingList() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id, // Add the document ID if needed
          ...doc.data(), // Spread the document data
        }));
        setBookings(fetchedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);


  // Function to format the departure date
  const formatDepartureDate = (timestamp) => {
    const date = new Date(timestamp); // Convert the timestamp to a Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; // Set the format
    return date.toLocaleDateString('en-US', options); // Format the date and return as a string
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {`${booking.departure} to ${booking.arrival}`}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Trip Type:</strong> {booking.tripType}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Seats:</strong> {booking.numberOfSeats}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Departure Date:</strong>{' '}
                      {formatDepartureDate(booking.departureDate)}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <strong>Preferred Time:</strong> {booking.preferredTime}
                    </Typography>
                    <Box mt={2}>
                      <Button variant="outlined" color="primary">
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No bookings available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default BookingList;
