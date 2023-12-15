import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [data, setdata] = useState({firstName:'',lastName:'',email:'',password:''});

  const changeHandler=(e)=>
  {
    setdata({...data,[e.target.name]:e.target.value})
  }
  const handleSignup=async(e)=>
  {
    e.preventDefault();
    try
    {
      console.log("submited Data",data)
      const response=await axios.post("http://localhost:2000/api/admin/signup",data)
      console.log("response",response.data)
      Navigate("/")
    }
    catch(err)
    {
      console.log("error",err)
    }
    
  }
  console.log("dataaaa",data)
  return (
    <div className="container mx-auto px-5 xl:px-4 2xl:px-4 sm:px-3 h-full">
      <form className="3xl:px-96 2xl:px-60 xl:px-32 lg:px-20 my-20 flex flex-col gap-4">
        <div className="flex justify-between gap-6 md:flex-wrap dsm:flex-wrap sm:flex-wrap">
          <div className="flex flex-col w-full ">
            <label htmlFor="firstName" className="text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter Your First Name"
              className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lastname" className="text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Your Last Name"
              className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email"
            className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="Enter Password"
            className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
          />
        </div>
        <div>
          <button className="bg-blue-600 p-2 px-4 rounded-lg text-white" onClick={handleSignup}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
