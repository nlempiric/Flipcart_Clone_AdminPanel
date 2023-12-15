import React from 'react'
import Product from '../Pages/Product'

const ProductModal = ({setProductModal,productDetail}) => {
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed top-24 left-0 right-0 flex z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
      <div className="relative p-4 w-full max-w-2xl max-h-full ">
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-xl dark:bg-gray-700 ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Product Detail
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={()=>setProductModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4 flex flex-col text-sm">
            <div>
                <h1 className=" font-bold">Name</h1>
                <p>{productDetail.name}</p>
            </div>
            <div>
                <h1 className=" font-bold">Price</h1>
                <p>{productDetail.price}</p>
            </div>
            <div>
                <h1 className=" font-bold">Quantity</h1>
                <p>{productDetail.quantity}</p>
            </div>
            <div>
                <h1 className=" font-bold">Category</h1>
                <p>{productDetail.category.name}</p>
            </div>
            <div>
                <h1 className=" font-bold">Description</h1>
                <p>{productDetail.description}</p>
            </div>
            {productDetail.productPictures!="" &&
            <div>
                <h1 className=" font-bold">Product Pictures</h1>
                <div className="flex gap-2 flex-wrap py-3">
                {productDetail.productPictures && productDetail.productPictures.map((pic)=>
                    <div className="w-[100px] h-[100px]">
                        <img src={`http://localhost:2000/${pic.img}`} alt="" className="object-contain"/>    
                    </div>
                )}
                </div>
            </div>
            }
            
          </div>


          
        </div>
      </div>
    </div> 
    </>
  )
}

export default ProductModal
