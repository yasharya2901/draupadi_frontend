import React from 'react'

function Field({title, type, placeholder, defaultValue, onChange}) {
  return (
    <div className='flex flex-col'>
        <label htmlFor="name" className='p-2 w-full block'>{title}</label>
        
          <input 
            type={type}
            className='border border-gray-400 p-2 w-full rounded-md m-2 max-w-xs'
            placeholder={placeholder}
            value={defaultValue}
            onChange={onChange}
          />
    </div>
  )
}

export default Field