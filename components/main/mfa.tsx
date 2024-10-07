// "use client";
// import { useState } from "react";
// import speakeasy from "speakeasy";
// import QRCode from "qrcode.react";
// import { auth } from "../firebase"; // Your Firebase setup
// import { getAuth, signOut } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import mfaPage from "@/app/mfa/page";

// export default function MFA() {
//   const [secret, setSecret] = useState<any>(null);
//   const [otpCode, setOtpCode] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const router = useRouter();

//   // Generate TOTP Secret
//   const generateSecret = () => {
//     const secret = speakeasy.generateSecret({
//       name: "YourAppName",
//     });
//     setSecret(secret);
//   };

//   // Verify the TOTP Code
//   const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const isVerified = speakeasy.totp.verify({
//       secret: secret.base32,
//       encoding: "base32",
//       token: otpCode,
//     });

//     if (isVerified) {
//       setMessage("2FA setup successful! You're logged in.");
//       router.push("/dashboard"); // Redirect to the dashboard after success
//     } else {
//       setMessage("Invalid code. Please try again.");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center" style={{ zIndex: 10, position: 'relative' }}>
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-4">Set Up 2FA</h2>
//         {!secret ? (
//           <div className="flex flex-col items-center">
//             <button
//               onClick={generateSecret}
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Generate QR Code
//             </button>
//           </div>
//         ) : (
//           <>
//             <p className="text-center mb-4">
//               Scan the QR code with your authenticator app:
//             </p>
//             <div className="flex justify-center mb-4">
//               <QRCode value={secret.otpauth_url} size={200} />
//             </div>
//             <form onSubmit={verifyOTP} className="space-y-4">
//               <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700">
//                 Enter OTP Code:
//               </label>
//               <input
//                 id="otpCode"
//                 type="text"
//                 value={otpCode}
//                 onChange={(e) => setOtpCode(e.target.value)}
//                 className="border border-gray-300 p-2 rounded w-full"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded"
//               >
//                 Verify OTP
//               </button>
//             </form>
//           </>
//         )}
//         {message && <p className="text-center mt-4 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };