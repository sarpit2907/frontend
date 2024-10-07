"use client";
import { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { auth, googleProvider, githubProvider, microsoftProvider } from '../firebase'; // Adjust the import paths as necessary
import { useRouter } from 'next/navigation'; // For navigating to other pages

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>(''); // New password for update
  const [passwordResetEmail, setPasswordResetEmail] = useState(''); // Email for password reset
  const [message, setMessage] = useState<string>('');
  const [showPasswordReset, setShowPasswordReset] = useState(false); // Toggle password reset form
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false); // Toggle password update form
  const [user, setUser] = useState<any>(null); // To store the logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track whether the user is logged in
  const router = useRouter(); // Next.js router

  // Handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      setUser(loggedInUser); // Store logged-in user for password update
      setMessage('Logged in successfully!');
      setIsLoggedIn(true); // Set user as logged in to show options
    } catch (error: any) {
      setMessage(error.message || 'Failed to log in');
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, passwordResetEmail); // Send password reset email
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error: any) {
      setMessage(error.message || 'Error sending password reset email.');
    }
  };

  // Handle password update for logged-in users
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setMessage('You need to be logged in to update your password.');
      return;
    }

    try {
      await updatePassword(user, newPassword); // Update the password for the logged-in user
      setMessage('Password updated successfully!');
      setShowPasswordUpdate(false);
      router.push('/');
    } catch (error: any) {
      setMessage(error.message || 'Error updating password.');
    }
  };

  // Social login methods
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setMessage('Signed in successfully with Google');
        setIsLoggedIn(true); // Set user as logged in to show options
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const signInWithGitHub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
        setMessage('Signed in successfully with GitHub');
        setIsLoggedIn(true); // Set user as logged in to show options
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const signInWithMicrosoft = () => {
    signInWithPopup(auth, microsoftProvider)
      .then((result) => {
        setUser(result.user);
        setMessage('Signed in successfully with Microsoft');
        setIsLoggedIn(true); // Set user as logged in to show options
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  // Option to redirect to the home page after login or after updating password
  const handleProceedToHome = () => {
    router.push('/'); // Redirect to the homepage
  };

  return (
    <div className="w-full h-screen mt-8 flex items-center justify-center" style={{ zIndex: 10, position: 'relative' }}>
      <div className="w-full max-w-lg bg-white px-8 py-6 rounded-lg shadow-md">
        <h1 className="text-3xl text-center font-semibold text-zinc-700 mb-4">Login</h1>

        {!isLoggedIn ? (
          <>
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
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
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-full py-2 px-4 font-semibold"
              >
                Login
              </button>
              {message && <p className="text-red-500 text-center">{message}</p>}
            </form>

            {/* Password Reset */}
            {!showPasswordReset ? (
              <button onClick={() => setShowPasswordReset(true)} className="text-red-600 mt-2">Forgot Password?</button>
            ) : (
              <form onSubmit={handlePasswordReset} className="mt-4">
                <p>Enter your email to reset your password</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={passwordResetEmail}
                  onChange={(e) => setPasswordResetEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button type="submit" className="w-full bg-blue-500 text-white rounded-full py-2 px-4 mt-2">Send Password Reset Email</button>
                <button type="button" onClick={() => setShowPasswordReset(false)} className="text-red-600 mt-2">Cancel</button>
              </form>
            )}
               {/* Social Login Buttons */}
        <div className="my-4 flex flex-col items-center">
          <button className="w-full bg-red-500 text-white rounded-full py-2 my-1" onClick={signInWithGoogle}>
            Continue with Google
          </button>
          <button className="w-full bg-gray-800 text-white rounded-full py-2 my-1" onClick={signInWithGitHub}>
            Continue with GitHub
          </button>
          <button className="w-full bg-green-600 text-white rounded-full py-2 my-1" onClick={signInWithMicrosoft}>
            Continue with Microsoft
          </button>
        </div>
          </>
        ) : (
          <>
            {/* After Login - Options to Update Password or Proceed */}
            <p className="text-green-600 text-center mb-4">Logged in successfully!</p>

            {!showPasswordUpdate ? (
              <button onClick={() => setShowPasswordUpdate(true)} className="w-full bg-green-600 text-white rounded-full py-2 px-4 mt-4">
                Update Password
              </button>
            ) : (
              <form onSubmit={handlePasswordUpdate} className="mt-4">
                <p>Enter your new password</p>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button type="submit" className="w-full bg-green-500 text-white rounded-full py-2 px-4 mt-2">Update Password</button>
                <button type="button" onClick={() => setShowPasswordUpdate(false)} className="text-red-600 mt-2">Cancel</button>
              </form>
            )}

            {/* Button to go to Home */}
            <button onClick={handleProceedToHome} className="w-full bg-blue-500 text-white rounded-full py-2 px-4 mt-4">
              Continue to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
