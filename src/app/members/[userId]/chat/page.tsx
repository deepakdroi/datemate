import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

export default function ChatPage() {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Chats
      </CardHeader>
      <Divider />
      <CardBody>Chats go here</CardBody>
    </>
  );
}
