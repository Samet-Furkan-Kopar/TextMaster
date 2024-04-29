import { getSession } from '@/actions/sessionAction';
import React from 'react'

const Home =async () => {
    const session = await getSession();
    console.log(session);
    
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
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Home