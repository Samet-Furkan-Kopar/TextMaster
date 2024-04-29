import { getSession } from '@/actions/sessionAction';
import React from 'react'

const Navbar = async() => {
    const session = await getSession();
    console.log(session);
    
  return (
    <div>
      Navbar
      {session?.isLoggedIn && "session true geldi"}
    </div>
  )
}

export default Navbar
