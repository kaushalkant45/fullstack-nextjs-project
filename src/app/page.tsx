"use client";
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-1000">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Welcome</h1>
        <Link href="/signup">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full block mb-4">
            Signup
          </div>
        </Link>
        <Link href="/login">
          <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full block">
            Login
          </div>
        </Link>
      </div>
    </div>
  );
}
