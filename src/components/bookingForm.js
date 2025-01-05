import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase';

function BookingForm() {
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    tripType: '',
    numberOfSeats: 1,
    departureDate: '',
    preferredTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSeatChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      numberOfSeats:
        type === 'increment' ? prev.numberOfSeats + 1 : Math.max(1, prev.numberOfSeats - 1),
    }));
  };

  // POST method to add booking data to Firestore
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
  
    try {
      // Get the server time in UTC (using Date.now())
      const serverTimeUTC = Date.now();
  
      // Adjust the time for UTC+1 (adding 1 hour to UTC)
      const departureDateUTCPlus1 = serverTimeUTC + 3600000;  // 1 hour = 3600000 milliseconds
  
      // Create a new document in the 'bookings' collection
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        departureDate: departureDateUTCPlus1,  // Save the adjusted timestamp in Firestore
      });
  
      alert('Booking Information Saved!');
      // Reset form after submission
      setFormData({
        departure: '',
        arrival: '',
        tripType: '',
        numberOfSeats: 1,
        departureDate: '',
        preferredTime: '',
      });
    } catch (err) {
      console.error('Error adding booking:', err);
      setError('Failed to save booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  


  const locations = ['Yaounde', 'Bamenda'];
  const tripTypes = ['One-Way', 'Round-Trip'];
  const timeOptions = ['Morning', 'Afternoon', 'Evening'];

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Book Your Trip
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" gap={3}>
        {/* Departure */}
        <FormControl fullWidth>
          <InputLabel id="departure-label">Departure</InputLabel>
          <Select
            labelId="departure-label"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
          >
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Arrival */}
        <FormControl fullWidth>
          <InputLabel id="arrival-label">Arrival</InputLabel>
          <Select
            labelId="arrival-label"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
          >
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Trip Type */}
        <FormControl fullWidth>
          <InputLabel id="tripType-label">Trip Type</InputLabel>
          <Select
            labelId="tripType-label"
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
          >
            {tripTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Number of Seats */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={2}>
            Number of Seats:
          </Typography>
          <IconButton
            onClick={() => handleSeatChange('decrement')}
            disabled={formData.numberOfSeats <= 1}
          >
            <Remove />
          </IconButton>
          <Typography>{formData.numberOfSeats}</Typography>
          <IconButton onClick={() => handleSeatChange('increment')}>
            <Add />
          </IconButton>
        </Box>

        {/* Departure Date */}
        <TextField
          fullWidth
          type="date"
          label="Departure Date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Preferred Time */}
        <FormControl fullWidth>
          <InputLabel id="preferredTime-label">Preferred Time</InputLabel>
          <Select
            labelId="preferredTime-label"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
          >
            {timeOptions.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Information'}
        </Button>
      </Box>
    </Box>
  );
}

export default BookingForm;
