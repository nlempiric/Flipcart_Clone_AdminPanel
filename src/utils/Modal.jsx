// Modal.js
import React from 'react';

const Modal = ({ children }) => {
  

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-24 left-0 right-0 flex z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
      <div className="relative p-4 w-full max-w-2xl max-h-full ">
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-xl dark:bg-gray-700 ">
      {children}
        </div>
      </div>
    </div> 
  );
};

export default Modal;
