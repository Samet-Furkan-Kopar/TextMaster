"use client"
// import { getSession } from '@/actions/sessionAction';
import { googleLogin, login } from '@/services/authFetch';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';

import React from 'react'

const Home = () => {
    const router = useRouter();

    const login = async() => {
        // const res = await googleLogin();
        const res =await fetch('http://localhost:8800/api/v1/auth/google-login',{method:'post'});
        const data = await res.json();
        console.log(data);
        router.push(data.url)
        
    }
 
  return (
    <section className="flex size-full flex-col gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-black bg-cover">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
                        HOMEPAGE
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">awdawdawd</h1>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                           awdawdawd
                        </p>
<<<<<<< HEAD
                            {/* <Link className='bg-white text-black' href='/login'>login</Link> */}
                            <button onClick={()=>login()} className='bg-white text-black'>login</button>
=======
                         
>>>>>>> 66166b6b38fa75f98ec8b5b0ecfff36f672358bd
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Home
