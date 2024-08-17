import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Field({ icon, type, placeholder, defaultValue, onChange }) {
  return (
    <div className='flex flex-row items-center justify-center'>
      {/* <label htmlFor={title} className='p-2 w-full block'>{title}</label> */}
      <FontAwesomeIcon className='p-3' icon={icon} />
      <input
        type={type}
        className={`border p-2 w-full m-2 max-w-xs ${type === 'number' ? 'appearance-none' : ''}`}
        placeholder={placeholder}
        value={defaultValue}
        onChange={onChange}
        style={type === 'number' ? { MozAppearance: 'textfield' } : {}}
      />
    </div>
  );
}

export default Field;
