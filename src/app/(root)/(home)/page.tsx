"use client";
// import { getSession } from '@/actions/sessionAction';
import { googleLogin, login } from "@/services/authFetch";
import { useRouter } from "next/navigation";
// import Link from 'next/link';
import ConverterTypes from "@/components/ConverterTypes";
import React from "react";
import { motion } from "framer-motion";
const Home = () => {
    const router = useRouter();

    const login = async () => {
        // const res = await googleLogin();
        const res = await fetch("http://localhost:8800/api/v1/auth/google-login", {
            method: "post",
        });
        const data = await res.json();
        console.log(data);
        router.push(data.url);
    };

    return (
        <motion.section
            initial={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="flex size-full flex-col gap-10 text-white"
        >
            <div className="h-[250px] w-full bg-home rounded-[20px] bg-black bg-cover mx-auto">
                <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
                        TEST
                    </h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">short description</h1>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">Description</p>
                        {/* <Link className='bg-white text-black' href='/login'>login</Link> */}
                        {/* <button onClick={()=>login()} className='bg-white text-black'>login</button> */}
                    </div>
                </div>
                <ConverterTypes />
            </div>
        </motion.section>
    );
};

export default Home;
