import { Button, Link } from "@nextui-org/react";
import React from "react";

export default function Menberspage() {
  return (
    <div>
      <h1>This is members page</h1>
      <Button as={Link} href="/" color="primary">
        Home
      </Button>
    </div>
  );
}
