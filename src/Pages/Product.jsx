import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductModal from "../utils/ProductModal";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../utils/Modal";


const Product = ({ setisproductAdded, token }) => {
  const navigate = useNavigate();
  const { isauth } = useSelector((state) => state.root.logindata);
  const { categoryData } = useSelector((state) => state.root.categorydata);
  const { productData } = useSelector((state) => state.root.prodata);
  const [productName, setproductName] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [productPictures, setproductPictures] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [productDetail, setproductDetail] = useState();
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleProductModal=(product)=>
  {
    setProductModal(true)
    setproductDetail(product)
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const toggleModal = () => {
   setIsModalOpen(true)
    setproductName("");
    setquantity("");
    setprice("");
    setdescription("");
    setproductPictures("")
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
   
  };

  const handleImageRemove = (i) => {
    const updatedPictures = [...productPictures];
    updatedPictures.splice(i, 1);
    setproductPictures(updatedPictures);
    console.log("upddatd",updatedPictures)
  };
  const declineHandler = () => {
    toggleModal();
  };

  const handleProductPictures = (e) => {
    setproductPictures([...productPictures, e.target.files[0]]);
    fileInputRef.current.value = "";
  };

  const handleAdd = async () => {
    console.log("dataaaaaa");
    const form = new FormData();
    if (
      productName === "" ||
      description === "" ||
      quantity === "" ||
      price === "" ||
      categoryId === ""
    ) {
      alert("Fill All The Data");
    }

    form.append("name", productName);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    try {
      const response = await axios.post(
        "http://localhost:2000/api/product/addproduct",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response.status == 201) {
        setisproductAdded(true);
      }
      alert(response.data.message);
      toggleModal();
    } catch (err) {
      console.log("error", err);
    }
  };

  const renderProducts = (productData) => {
    return (
      <table className="table-auto text-center w-full">
        <thead>
          <tr className="bg-gray-300">
            <th className="border py-2">#</th>
            <th className="border">Name</th>
            <th className="border">Price</th>
            <th className="border">Quantity</th>
            <th className="border">Category</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {productData.length > 0
            ? productData.map((product,index) => (
                <tr key={product._id} className="py-10 hover:bg-gray-200 cursor-pointer" onClick={()=>handleProductModal(product)}>
                  <td className="py-2">{index+1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td> 
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {isauth ? (
        <>
          <div
            className={`container mx-auto px-5 xl:px-4 2xl:px-4 sm:px-3 h-full py-10 ${
              productModal || isModalOpen ? " opacity-20" : ""
            }`}
          >
            <div className="pb-7 flex justify-end">
              <button
                onClick={toggleModal}
                className="block text-white bg-[#030337] border border-1 border-[#030337] hover:bg-transparent hover:text-[#030337]  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                type="button"
              >
                Add Product
              </button>
            </div>

            <div>{renderProducts(productData)}</div>

           
          </div>
        </>
      ) : (
        navigate("/")
      )}
       {isModalOpen && (
        <>
          <Modal>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add New Product
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={()=>setIsModalOpen(false)}
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

                  <div className="p-4 md:p-5 space-y-4 flex flex-col">
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={productName}
                      onChange={(e) => setproductName(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                    />
                    <select
                      name="Select Catgory"
                      value={categoryId}
                      onChange={(e) => setcategoryId(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {createCategoryList(categoryData).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>

                    {productPictures.length > 0
                      ? productPictures.map((pic, index) => (
                          <div key={index} className="flex items-center gap-2">{pic.name}<IoCloseOutline onClick={()=>handleImageRemove(index)}/></div>
                        ))
                      : null}
                    <input
                      type="file"
                      name="CategoryImage"
                      ref={fileInputRef}
                      onChange={handleProductPictures}
                      accept="image/*"

                    />
                  </div>

                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={handleAdd}
                      type="button"
                      className="text-white bg-[#030337] border border-1 border-[#030337] hover:bg-transparent hover:text-[#030337] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  
                  </div>
          </Modal>
        </>
      )}
      {productModal && <ProductModal setProductModal={setProductModal} productDetail={productDetail}/>}
    </>
  );
};

export default Product;
