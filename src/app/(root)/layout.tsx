import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Text",
  description: "text",
  icons:{
    //   icon: '/icons/logo.svg',
  }
};
const RootLayout = ({children}:{children : ReactNode}) => {
  return (
    <main className='bg-dark-2 h-min-screen'>
        {children}
    </main>
  )
}

export default RootLayout
