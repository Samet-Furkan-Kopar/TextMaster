"use client"
import { useAccount } from '@/store/user/hooks'
import React from 'react'

const page = () => {
  const currentAccount = useAccount()
  console.log(currentAccount,"aaaaaaaaa")
  return (
    <div>
      
    </div>
  )
}

export default page
