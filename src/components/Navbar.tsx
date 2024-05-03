"use client"
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { getSession, logout } from '@/actions/sessionAction';

const Navbar = () => {

    const router = useRouter()
    const [session, setSession] = useState('')


    useEffect(()=>{
      getSession().then((res:any)=>{
        setSession(res)
      })
    },[])

    const handleLogOut=async ()=>{
      await logout();
      getSession().then((res:any)=>{
        setSession(res)
      })
    }
  


  return (
    <div className='bg-[#1C1F2E] h-16 flex flex-row justify-between items-center'>
      <div className='text-white ml-14 font-extrabold text-xl cursor-pointer' onClick={()=>{router.push('/')}}>TextMaster</div>
      <div className='flex '> {session?.isLoggedIn ? (
    <DropdownMenu>
  <DropdownMenuTrigger className='w-9
 h-9 bg-[#9a22f0] mr-14 rounded-full cursor-pointer '></DropdownMenuTrigger>
 
      <DropdownMenuContent>
    <DropdownMenuLabel className='cursor-pointer'>{session?.username}</DropdownMenuLabel>
    <DropdownMenuSeparator className='cursor-pointer'/>
    <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
    <DropdownMenuItem className='cursor-pointer'>Billing</DropdownMenuItem>
    <DropdownMenuItem className='cursor-pointer' onClick={handleLogOut}>Log Out</DropdownMenuItem>
  </DropdownMenuContent>
 

</DropdownMenu> ):( <div onClick={()=>{router.push('/login')}} className='cursor-pointer flex h-9 bg-[#9a22f0] text-center items-center mr-14 px-3 rounded-md text-white font-semibold'>LogIn</div>)}</div>
    </div>
  ) 
}

export default Navbar
