import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function ShareBox() {
    const message = encodeURIComponent("Help Us Spread The Word! Join us in our mission to help the safety of women in India. Register now at ");
    const url = encodeURIComponent("https://draupadi.help");

    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`, '_blank');
    };

    const handleWhatsappShare = () => {
        window.open(`https://api.whatsapp.com/send?text=${message} ${url}`, '_blank');
    };

    const handleInstagramShare = () => {
        // Instagram doesn't support direct URL sharing with message
        window.open('https://www.instagram.com/', '_blank');
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${message}`, '_blank');
    };

    return (
        <div className='flex flex-col items-center'>
            <div>Spread the word</div>
            <div className='flex flex-row'>
                <button onClick={handleFacebookShare}><FontAwesomeIcon icon={faFacebook} className='text-3xl p-3'/></button>
                <button onClick={handleWhatsappShare}><FontAwesomeIcon icon={faWhatsapp} className='text-3xl p-3' /></button>
                <button onClick={handleInstagramShare}><FontAwesomeIcon icon={faInstagram} className='text-3xl p-3' /></button>
                <button onClick={handleTwitterShare}><FontAwesomeIcon icon={faTwitter} className='text-3xl p-3' /></button>
            </div>
        </div>
    );
}

export default ShareBox;
