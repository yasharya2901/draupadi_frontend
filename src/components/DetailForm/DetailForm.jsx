import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Field from '../Field/Field';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import './DetailForm.css';

function DetailForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locations, setLocations] = useState([{ addressType: 'home', address: '', lat: '', lng: '' }]);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [addingIndex, setAddingIndex] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });

    loader.load().then(() => {
      locations.forEach((_, index) => {
        const input = inputRefs.current[index];
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
    const newLocation = { addressType: 'home', address: '', lat: '', lng: '' };
    setLocations([...locations, newLocation]);
    setAddingIndex(locations.length);
    setTimeout(() => setAddingIndex(null), 300); // Match the duration of the Tailwind CSS transition
  };

  const handleRemoveLocation = (index) => {
    if (locations.length > 1) {
      setRemovingIndex(index);
      setTimeout(() => {
        setLocations(locations.filter((_, i) => i !== index));
        setRemovingIndex(null);
      }, 300); // Match the duration of the Tailwind CSS transition
    }
  };

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      phone: phone,
      locations: [...locations]
    };
    console.log(data);
  };

  return (
    <div>
      <form className='flex flex-col max-w-[400px] p-4 input-custom-style bg-[#a19e9e] rounded-md' onSubmit={handleSubmit}>
        <Field icon={faUser} type="text" defaultValue={name} placeholder={`Name`} onChange={(e) => setName(e.target.value)} />
        <Field icon={faPhone} type="number" defaultValue={phone} placeholder={`+918932358392`} onChange={(e) => setPhone(e.target.value)} />

        <div className='flex flex-row items-center justify-center'>
          <FontAwesomeIcon icon={faLocationDot}  className='p-3'/>
          <label htmlFor="locations" className='p-2 w-full block'>Locations</label>
        </div>
        {locations.map((location, index) => (
          <div
            key={index}
            className={`flex items-center transition-all duration-300 ${removingIndex === index ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-full'} ${addingIndex === index ? 'opacity-0' : 'opacity-100'}`}
          >
            <select
              className={`border bg-transparent border-none border-b-stone-400 p-2 m-2 max-w-xs transition-all duration-300 ${removingIndex === index ? 'w-0' : 'w-full'}`}
              value={location.addressType}
              onChange={(e) => handleLocationChange(index, 'addressType', e.target.value)}
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className={`border border-gray-400 p-2 m-2 max-w-xs transition-all duration-300 ${removingIndex === index ? 'w-0' : 'w-full'}`}
              placeholder='Add a new location'
              value={location.address}
              onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
            />
            {locations.length > 1 && (
              <button
                type="button"
                className='p-2 rounded-md'
                onClick={() => handleRemoveLocation(index)}
              >
                <FontAwesomeIcon icon={faTrash} color='#a00c56' />
              </button>
            )}
          </div>
        ))}
        <button type="button" className='p-2 m-2 bg-[#a00c56] text-white rounded-md max-w-xs' onClick={handleAddLocation}>Add More Location</button>
        <button type="submit" className='p-2 m-2 bg-[#a00c56] text-white rounded-md max-w-xs'>Submit</button>
      </form>
    </div>
  );
}

export default DetailForm;