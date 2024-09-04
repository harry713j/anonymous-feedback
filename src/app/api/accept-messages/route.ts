import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptingMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptingMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Unable to find the user",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating message acceptance status", error);
    return Response.json(
      {
        success: false,
        message: "Error updating message acceptance status",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Success finding accept message status",
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 401 }
    );
  } catch (error) {
    console.log("Error getting user message acceptance status", error);
    return Response.json(
      {
        success: false,
        message: "Error getting user message acceptance status",
      },
      { status: 500 }
    );
  }
}
