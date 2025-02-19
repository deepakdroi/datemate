import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiLovers } from "react-icons/gi";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import UserMenu from "./UserMenu";

export default async function TopNav() {
  const session = await auth();
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-red-400 to-slate-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-slate-900",
        ],
      }}
    >
      <NavbarBrand as={Link} href={"/"}>
        <GiLovers size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-slate-600">Date</span>
          <span className="text-gray-200">Mate</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/members" label="Matches"></NavLink>
        <NavLink href="/lists" label="Lists"></NavLink>
        <NavLink href="/messages" label="Messages"></NavLink>
      </NavbarContent>
      <NavbarContent justify="end">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <>
            <Button
              as={Link}
              href={"/login"}
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href={"/register"}
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
