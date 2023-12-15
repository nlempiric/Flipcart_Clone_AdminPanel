import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'


const Layout = ({children,setToken}) => {
  return (
    <>
    <div className='flex flex-col  h-full'>
    <Header setToken={setToken}/>
            {children}
        {/* <Footer/> */}
    </div>
       
    </>

  )
}

export default Layout
