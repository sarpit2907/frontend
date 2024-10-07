"use client";
import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [user, setUser] = useState<any>(null); // State to track the logged-in user
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if logged in
      } else {
        setUser(null); // No user logged in
      }
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-[100] px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="/"
          className="h-auto w-auto flex flex-row items-center"
        >
          {/* <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          /> */}

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            Inter IIT
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="#about-me" className="cursor-pointer">
              About me
            </a>
            <a href="#skills" className="cursor-pointer">
              Submit
            </a>
            <a href="#projects" className="cursor-pointer">
              History
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          {Socials.map((social) => (
            <Image
              src={social.src}
              alt={social.name}
              key={social.name}
              width={24}
              height={24}
            />
          ))}
          {/* Buttons */}
          <div>
          {user ? (
            // If the user is logged in, show "Logout" button
            <button
              onClick={handleLogout}
              className="bg-[#7042f861] hover:bg-[#7042f8] text-gray-200 font-semibold py-[10px] px-[20px] rounded-full border border-[#7042f8] transition-all duration-300">
              Logout
            </button>
          ) :(
            <>
          <Link href="/register" passHref>
          <button
            className="bg-[#7042f861] hover:bg-[#7042f8] text-gray-200 font-semibold py-[10px] px-[20px] rounded-full border border-[#7042f8] transition-all duration-300">
            Sign In
          </button>
          </Link>
          <Link href="/login" passHref>
          <button
            className="bg-[#7042f861] hover:bg-[#7042f8] text-gray-200 font-semibold py-[10px] px-[20px] rounded-full border border-[#7042f8] transition-all duration-300 ml-2">
            Login
          </button>
          </Link>
          </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
