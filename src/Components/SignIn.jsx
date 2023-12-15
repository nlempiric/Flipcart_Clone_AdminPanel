import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../redux/reducers/auth";
import { Link } from "react-router-dom";

const SignIn = ({ setToken }) => {
  const [data, setdata] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isauth } = useSelector((state) => state.root.logindata);

  const changeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("submited Data", data);
      const response = await axios.post(
        "http://localhost:2000/api/admin/login",
        data
      );
      console.log("response", response);
      if (response.status==200) {
        const t = response.data.Token;
        localStorage.setItem("token", t);
        dispatch(loginReducer(!isauth));
        setToken(t);
      }
      else
      {
        console.log("message",response.data.message)
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  console.log("dataaaa", data);
  return (
    <>
      <div className="container mx-auto px-5 xl:px-4 2xl:px-4 sm:px-3 h-full">
        <form className="3xl:px-96 2xl:px-60 xl:px-32 lg:px-20 my-20 flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={changeHandler}
              className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              className="w-full border-1 border-gray-300 outline-none focus:border-blue-400 focus:outline-none focus:ring-0 rounded-md"
            />
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" id="remeberme" className="focus:ring-0" />
            <label htmlFor="remeberme" className="text-gray-600">
              Check Me Out
            </label>
          </div>
          <div>
            <button
              className="bg-blue-600 p-2 px-4 rounded-lg text-white"
              onClick={handleLogin}
            >
              Submit
            </button>
          
          </div>
          <Link to="/signup" className="text-blue-700 hover:underline">Click Here To SignUP</Link>
        </form>
       
      </div>
    </>
  );
};

export default SignIn;
