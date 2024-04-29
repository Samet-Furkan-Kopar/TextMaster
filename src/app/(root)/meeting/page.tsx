import { getSession } from '@/actions/sessionAction';
import React from 'react'

const page = async() => {
    const session = await getSession();
    console.log(session);
    
  return (
    <div>
      
    </div>
  )
}

export default page
