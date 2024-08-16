import React, { useState } from 'react'
import Field from '../Field'

function DetailForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locations, setLocations] = useState([{ addressType: 'home', address: '' }]);

  const handleAddLocation = () => {
    setLocations([...locations, { addressType: 'home', address: '' }]);
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
  }

  return (
    <div>
      <form className='flex flex-col bg-indigo-400 max-w-[400px] p-4' onSubmit={handleSubmit}>
        <Field title="Name" type="text" defaultValue={name} placeholder={`Alice Singh`} onChange={(e) => setName(e.target.value)} />
        <Field title="Phone" type="number" defaultValue={phone} placeholder={`+91 89323 58392`} onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="locations" className='p-2 w-full block'>Locations</label>
        {locations.map((location, index) => (
          <div key={index} className='flex'>
            <select
              className='border border-gray-400 p-2 w-full rounded-md m-2 max-w-xs'
              value={location.addressType}
              onChange={(e) => handleLocationChange(index, 'addressType', e.target.value)}
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              className='border border-gray-400 p-2 w-full rounded-md m-2 max-w-xs'
              placeholder='Add a new location'
              value={location.address}
              onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
            />
          </div>
        ))}
        <button type="button" className='p-2 m-2 bg-blue-500 text-white rounded-md max-w-xs' onClick={handleAddLocation}>Add More Location</button>
        <button type="submit" className='p-2 m-2 bg-blue-500 text-white rounded-md max-w-xs'>Submit</button>
      </form>
    </div>
  )
}

export default DetailForm