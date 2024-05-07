"use client";
// import { getSession } from '@/actions/sessionAction';
import { googleLogin, login } from "@/services/authFetch";
import { useRouter } from "next/navigation";
// import Link from 'next/link';
import ConverterTypes from "@/components/ConverterTypes";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
const Home = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const login = async () => {
        // const res = await googleLogin();
        const res = await fetch("http://localhost:8800/api/v1/auth/google-login", {
            method: "post",
        });
        const data = await res.json();
        console.log(data);
        // router.push(data.url);
    };
    if(loading) return <Loader/>

    return (
        <section
            className="flex size-full flex-col gap-10 text-white"
        >
            <div className="h-[250px] w-full bg-home rounded-[20px] bg-black bg-cover mx-auto">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center max-md:text-xl text-2xl font-medium text-sky-1">
                        TEST
                    </h2>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla iusto eos tempore atque beatae sint, dolor esse quod quae qui.</p>
                        {/* <Link className='bg-white text-black' href='/login'>login</Link> */}
                        <button onClick={()=>login()} className='bg-white text-black'>login</button>
                    </div>
                </div>
                <ConverterTypes setLoading={setLoading} />
            </div>
        </section>
    );
};

export default Home;
