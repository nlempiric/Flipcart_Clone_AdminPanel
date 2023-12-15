import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { loginReducer } from "../redux/reducers/auth";

const Header = ({setToken}) => {
  const dispatch = useDispatch();
  const { isauth } = useSelector((state) => state.root.logindata);
  const location = useLocation();
  console.log("location.pathname",location.pathname)


  const handleAuth = () => {
    console.log("logiyeee")
    dispatch(loginReducer(false));
    localStorage.removeItem("token")
    setToken("")
    };

  return (
    // <div>
    //   <nav className="bg-slate-500 border-gray-200 dark:bg-gray-900">
    //     <div className="container mx-auto flex justify-between">
    //       <div>
    //         <Link to="/">
    //         <h1 className="text-2xl text-red-950">Admin</h1>
    //         </Link>

    //       </div>
    //       <div>
    //         <ul className="flex gap-2">
    //           <Link to="/signin">
    //             <button>Sign IN</button>
    //           </Link>
    //           <Link to="/signup">
    //             <button>Sign Up</button>
    //           </Link>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    <div className="bg-gray-400">
      <div className="container mx-auto px-5 xl:px-4 2xl:px-4 sm:px-3 flex justify-between items-center py-4">
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold font-serif text-[#060614]">Admin</h1>
          </Link>
        </div>
        <div className="flex items-center gap-8 lg:gap-5">
          <div>
            <ul className="hidden 3xl:!flex 2xl:!flex lg:!flex xl:!flex md:hidden sm:hidden text-[#3b3b47] text-lg gap-10 lg:gap-5 items-center">
            
              {isauth && (
              <>
              <li className={`hover:text-[#050515] hover:border-b border-[#050515] ${location.pathname === "/" ? 'text-[#030337] border-b border-[#030337]' : ''} `}><Link exact to="/">Home</Link></li>
              <li className={`hover:text-[#050515] hover:border-b border-[#050515] ${location.pathname === "/category" ? 'text-[#030337] border-b border-[#030337]' : ''}`}><Link to="/category">Category</Link></li>
              <li className={`hover:text-[#050515] hover:border-b border-[#050515] ${location.pathname === "/product" ? 'text-[#030337] border-b border-[#030337]' : ''}`}><Link to="/product">Products</Link></li>
              <li className={`hover:text-[#050515] hover:border-b border-[#050515]`}>Order</li>
              <button className="hover:text-[#050515]" onClick={handleAuth}>Logout</button>
              </>) 
              }
            </ul>
          </div>

          <div className="hidden md:!flex dsm:!flex sm:!flex text-3xl">
            <HiMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
