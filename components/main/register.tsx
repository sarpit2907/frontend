"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this points to your Firebase config file

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationId, setVerificationId] = useState<string>('');
  const router = useRouter();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const clientAuth = auth || getAuth(); 
  //     clientAuth.settings.appVerificationDisabledForTesting = true; // Disable for testing
  //     // setupRecaptcha();
  //   }
  // }, []);

  // Setup RecaptchaVerifier
  // const setupRecaptcha = () => {
  //   if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       'recaptcha-container', // ID of reCAPTCHA container
  //       {
  //         size: 'invisible', // Invisible reCAPTCHA
  //         callback: (response) => {
  //           console.log('Recaptcha verified successfully:', response);
  //           // You can trigger your sign-in process after reCAPTCHA is verified
  //         },
  //       },
  //       auth // Pass the Firebase auth instance
  //     );
  //   }
  // };

  // Function to handle phone number verification and send the SMS
  // const onSignInSubmit = async () => {
  //   setMessage('');
  //   try {
  //     const formattedPhoneNumber = ${contactNumber}; // Make sure phone number has a country code
  //     const appVerifier = window.recaptchaVerifier;

  //     // Send SMS verification
  //     const phoneProvider = new PhoneAuthProvider(auth);
  //     const verificationId = await phoneProvider.verifyPhoneNumber(formattedPhoneNumber, appVerifier);
  //     setVerificationId(verificationId); // Store verificationId for code verification
  //     setMessage('SMS sent successfully! Enter the verification code.');
  //   } catch (error: any) {
  //     console.error('Error during phone authentication:', error);
  //     setMessage(error.message || 'Failed to send SMS.');
  //   }
  // };

  // Handle registration and sending SMS for 2FA
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      // Register user using Firebase auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: username,
      });
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setMessage(error.message || 'Registration failed.');
    }
  };

  // Handle verification of the SMS code
  // const handleVerifyCode = async () => {
  //   try {
  //     const phoneAuthCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
  //     await signInWithCredential(auth, phoneAuthCredential); // Complete the sign-in with the verification code
  //     setMessage('Phone number verified successfully! Redirecting...');
  //     setTimeout(() => {
  //       router.push('/dashboard'); // Redirect to dashboard or other page
  //     }, 1500);
  //   } catch (error: any) {
  //     console.error('Error verifying code:', error);
  //     setMessage('Invalid code. Please try again.');
  //   }
  // };

  return (
    <div className="w-full h-screen mt-8 flex items-center justify-center" style={{ zIndex: 10, position: 'relative' }}>
      <div className="w-1/3 bg-white px-8 py-6 rounded-lg shadow-md">
        <h1 className="text-3xl text-center font-semibold text-zinc-700 mb-4">Register</h1>
        <p className="text-center text-md mb-4">Sign up to get started</p>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Form fields */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Contact Number (with country code)"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white rounded-full py-2 px-4 font-semibold">
            Register
          </button>

          {message && <p className="text-red-500 text-center">{message}</p>}
        </form>

        {/* SMS Code Verification Input */}
        {verificationId && (
          <div className="mt-4">
            <h2>Enter Verification Code</h2>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="block w-full border p-2"
            />
            <button onClick={handleVerifyCode} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
              Verify Code
            </button>
          </div>
        )}
        {/* <div id="recaptcha-container"></div> */}
      </div>
    </div>
  );
}
