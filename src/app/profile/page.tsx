"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to get user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-1000">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Profile</h1>
        <hr className="mb-4" />
        <p className="text-lg text-gray-300 mb-4">Profile page</p>
        <h2 className="p-2 bg-green-500 text-black rounded-lg mb-4">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="text-blue-500 hover:underline"
            >
              {data}
            </Link>
          )}
        </h2>
        <hr className="mb-4" />
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
