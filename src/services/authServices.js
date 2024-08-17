// src/services/authService.js

import { auth } from '../firebase/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Initialize reCAPTCHA verifier
// const setupRecaptchaVerifier = () => {
//     if (window.recaptchaVerifier) {
//         window.recaptchaVerifier.clear();
//     }
//   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//     size: 'invisible', // or 'normal' for visible reCAPTCHA
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       console.log('reCAPTCHA solved');
//     },
//     'expired-callback': () => {
//       // Handle reCAPTCHA expiration
//       console.log('reCAPTCHA expired');
//     }
//   });
// };

export const sendOtp = async (phoneNumber) => {
//   setupRecaptchaVerifier(); // Ensure reCAPTCHA is set up
  console.log(`Sending OTP to ${phoneNumber}...`);
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult; // Return the confirmationResult to handle verification
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyOtp = async (confirmationResult, otpCode) => {
  try {
    const result = await confirmationResult.confirm(otpCode);
    const user = result.user;
    return user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
