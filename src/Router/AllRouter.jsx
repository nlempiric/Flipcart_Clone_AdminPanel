import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
// import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Category from "../Pages/Category";
import Product from "../Pages/Product";

const AllRouter = ({setToken,token,setiscategorryAdded,setisproductAdded}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage setToken={setToken}/>} />
        {/* <Route path="/signin" element={<SignIn setToken={setToken}/>} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category" element={<Category token={token} setiscategorryAdded={setiscategorryAdded}/>} />
        <Route path="/product" element={<Product setisproductAdded={setisproductAdded} token={token}/>} />
      </Routes>
    </>
  );
};

export default AllRouter;
