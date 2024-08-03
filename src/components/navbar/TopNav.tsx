import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GiLovers } from 'react-icons/gi'

export default function TopNav() {
  return (
    <Navbar maxWidth='xl'
    className='bg-gradient-to-r from-red-400 to-slate-700'
    classNames={{
        item:[
            "text-xl",
            "text-white",
            "uppercase"
        ]
        
    }}>
        <NavbarBrand 
         as={Link} href={"/"}>
          <GiLovers   size={40} className='text-gray-200'/>
          <div className='font-bold text-3xl flex'>
            <span className='text-gray-900'>Date</span>
            <span className='text-gray-200'>Mate</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
            <NavbarItem as={Link} href={"/members"}>Matches</NavbarItem>
            <NavbarItem as={Link} href={"/lists"}>Lists</NavbarItem>
        <NavbarItem as={Link} href={"/messages"}>Messages</NavbarItem></NavbarContent>
        <NavbarContent justify='end'>
            <Button as={Link} href={"/login"} variant='bordered' className='text-white'>Login</Button>
            <Button as={Link} href={"/register"} variant='bordered' className='text-white'>Register</Button>

        </NavbarContent>

    </Navbar>
  )
}
