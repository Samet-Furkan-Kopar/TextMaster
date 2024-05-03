"use client"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import { getSession } from "@/actions/sessionAction";

const AuthLayout = ({children}:{children : ReactNode}) => {
    const [session, setSession] = useState("");
    const router = useRouter();

    useEffect(() => {
        getSession().then((res:any) => {
            setSession(res);
        });
    }, []);

    // Oturum açılmış ve yönlendirme yapılması gerekiyorsa "/" sayfasına yönlendir
    if (session?.isLoggedIn) {
        router.push("/");
        return <Loader />;
    }
    
  return (

            <main className='w-full'>
               {session?.isLoggedIn === false && children}
            </main>
        
  )
}

export default AuthLayout
