
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}:{children : ReactNode}) => {
  return (
    <main className='relative min-h-screen'>
        <Navbar/>
        <div className='flex'>
        <section className='flex h-full flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            <main className='w-full'>
            {children}
            </main>
        </section>
        </div>
        <Footer/>
    </main>
  )
}

export default HomeLayout
