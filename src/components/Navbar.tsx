"use client"
import { getSession } from '@/actions/sessionAction';
import React, { useEffect } from 'react'
import { useCounter } from '@/store/counter/hooks';
// import { useSelector } from 'react-redux';
import { dailyCounterIncrease } from '@/store/counter/actions';
const Navbar = () => {
    // const session = await getSession();
    // const counter = useSelector((state: any) => state.counter)
    // console.log(counter);
    
    const counter = useCounter();
    console.log(counter);

   



    
    
  return (
    <div>
      Navbar
      {/* {session?.isLoggedIn && "session true geldi"} */}
      <button onClick={()=>dailyCounterIncrease()}>Increase</button>
      {counter?.dailyCounter}
    </div>
  )
}

export default Navbar
