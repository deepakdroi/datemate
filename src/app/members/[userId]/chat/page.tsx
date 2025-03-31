import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const currentUserId = await getAuthUserId();
  const messages = await getMessageThread(userId);
  const body = (
    <div>
      {messages.length === 0 ? (
        "No message to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
}
