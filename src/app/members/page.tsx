import React from "react";
import { getMembers } from "../actions/memberAction";

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div>
      <ul>
        {members &&
          members.map((member) => <li key={member.id}>{member.name}</li>)}
      </ul>
    </div>
  );
}
