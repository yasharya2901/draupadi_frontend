import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
    const instagramLink = 'https://www.instagram.com/';
    const twitterLink = 'https://twitter.com/';
  return (
    <div className='flex flex-row items-center'>
        <span >Follow us on </span> <span className='flex flex-row'><button className='ml-2' onClick={() => window.open(instagramLink, '_blank')}><FontAwesomeIcon icon={faInstagram} className='text-3xl ' /></button> <button onClick={() => window.open(twitterLink, '_blank')}><FontAwesomeIcon icon={faTwitter} className='text-3xl p-3' /></button></span>
    </div>
  )
}

export default Footer