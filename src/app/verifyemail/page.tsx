"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  //   const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //nextjs utilization in this section

    // const {query} = router;
    // const urlTokenTwo = query.token
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-1000">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black rounded-lg mb-4">
          {token ? `${token}` : "No token"}
        </h2>

        {verified && (
          <div className="bg-green-500 p-4 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Email Verified</h2>
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div className="bg-red-500 p-4 rounded-lg">
            <h2 className="text-2xl text-black">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
