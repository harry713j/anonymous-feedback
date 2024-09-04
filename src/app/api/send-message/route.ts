import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return Response.json(
        {
          success: false,
          messages: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          messages: "User is no longer accepting the message",
        },
        { status: 403 }
      );
    }

    const newMessage = {
      content: content,
      createdAt: new Date(),
    };

    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        success: true,
        messages: "Message sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding message", error);
    return Response.json(
      {
        success: false,
        messages: "Error occurred while adding the messages",
      },
      { status: 500 }
    );
  }
}
