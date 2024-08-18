import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, Grid, Box, Typography, Link, Button } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

const DetailFormNew = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locations, setLocations] = useState([{ type: 'Home', address: '', lat: '', lng: '' }]);
  const inputRefs = useRef([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });

    loader.load().then(() => {
      // Initialize Google Maps Autocomplete for each location input field
      inputRefs.current.forEach((input, index) => {
        if (input) {
          const autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const formattedAddress = place.formatted_address || '';
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              handleLocationChange(index, 'address', formattedAddress);
              handleLocationChange(index, 'lat', lat);
              handleLocationChange(index, 'lng', lng);
            }
          });
        }
      });
    }).catch((error) => {
      console.error('Error loading Google Maps API:', error);
    });
  }, [locations]);

  const handleAddLocation = () => {
    setLocations([...locations, { type: '', address: '', lat: '', lng: '' }]);
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = locations.map((location, i) =>
      i === index ? { ...location, [field]: value } : location
    );
    setLocations(updatedLocations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post_link = import.meta.env.VITE_API_DATA_SAVE;
      let data = { data: { project: "draupadi", name, phoneNumber, locations } };
      console.log(data);
      const post = await axios.post(post_link, data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '450px', margin: 'auto', padding: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
          }}
        />
      </div>

      {locations.map((location, index) => (
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <Select
                  value={location.type}
                  onChange={(e) => handleLocationChange(index, 'type', e.target.value)}
                  sx={{
                    borderRadius: '30px',
                  }}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                placeholder="Location"
                value={location.address}
                onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '30px',
                  border: '1px solid #ccc',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  fontSize: '16px',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent form submission
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Typography variant="body2" color="primary" style={{ marginBottom: '15px' }}>
        <Link href="#" color="secondary" onClick={handleAddLocation}>
          Add More Locations
        </Link>
      </Typography>

      <Button
        variant="contained"
        fullWidth
        type="submit"
        sx={{
          borderRadius: '30px',
          backgroundColor: '#a00c56',
          '&:hover': {
            backgroundColor: '#8a0845',
          },
        }}
      >
        Submit Details
      </Button>
    </form>
  );
};

export default DetailFormNew;
