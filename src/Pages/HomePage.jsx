import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignIn from '../Components/SignIn';

const HomePage = ({setToken}) => {
  const { isauth } = useSelector((state) => state.root.logindata);
  const navigate=useNavigate();


  return (
    <>
    {isauth ?
    <>
      <div className="flex flex-col text-center gap-6 py-40 font-mono text-[#030337]">
        <p className="text-4xl font-medium">Hello</p>
        <p className="text-5xl font-extrabold">Welcome To The Admin Panel</p>
      </div>
    </> : 
     <SignIn setToken={setToken}/>
    }
    </>
   
  )
}

export default HomePage
