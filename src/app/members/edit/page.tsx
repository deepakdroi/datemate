import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberAction";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { get } from "http";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "./EditForm";

export default async function EditPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
