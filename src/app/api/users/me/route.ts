import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  // WRITE CODE IF THERE IS NO USER
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
