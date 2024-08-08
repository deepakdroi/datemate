import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import {
  GiLockedBox,
  GiLockedDoor,
  GiLockedHeart,
  GiLockers,
  GiLockPicking,
  GiPadlock,
  GiPagoda,
} from "react-icons/gi";

export default function LoginForm() {
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-slate-500">
          <div className="flex flex-row gap-3 items-center">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to DateMate!</p>
        </div>
      </CardHeader>
      <CardBody>
        <form action="">
          <div className="space-y-4">
            <Input label="Email" variant="bordered" />
            <Input label="Password" variant="bordered" type="password" />
            <div className="flex flex-row gap-3">
              <Button
                className="w-1/2 justify-center bg-slate-500 text-slate-50"
                type="submit"
              >
                Login
              </Button>
              <Button
                className="w-1/2 justify-center  bg-slate-50 text-slate-500"
                variant="bordered"
                type="submit"
              >
                Forgot Password
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
