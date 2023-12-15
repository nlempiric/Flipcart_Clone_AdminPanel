import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";

const Category = ({ token, setiscategorryAdded }) => {
  const navigate = useNavigate();
  const { isauth } = useSelector((state) => state.root.logindata);
  const { categoryData } = useSelector((state) => state.root.categorydata);
  const [categoryName, setcategoryName] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleChange = (e) => {
    setcategoryName(e.target.value);
  };
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const rederCategories = (categories) => {
    let myCategories = [];
    let d = {};
    for (let cat of categories) {
      myCategories.push(
        <li key={cat.name}>
          {cat.name}
          {cat.children.length > 0 && (
            <ul className="list-disc">{rederCategories(cat.children)}</ul>
          )}
        </li>
      );
    }
    return myCategories;
  };
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
    setcategoryName("");
    setparentCategoryId("");

    // Clear the file input value using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAdd = async () => {
    const form = new FormData();
    if (categoryName === "") {
      alert("Category name is required");
    }
    if (parentCategoryId != "") {
      form.append("parentId", parentCategoryId);
    }
    if (categoryImage != "") {
      form.append("categoryImage", categoryImage);
    }
    form.append("name", categoryName);

    try {
      const response = await axios.post(
        "http://localhost:2000/api/category/addcat",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response.status == 201) {
        setiscategorryAdded(true);
      }
      alert(response.data.message);
      toggleModal();
    } catch (err) {
      console.log("error", err);
    }
  };

  const declineHandler = () => {
    toggleModal();
  };

  return (
    <>
      {isauth ? (
        <>
          <div className={`container mx-auto px-5 xl:px-4 2xl:px-4 sm:px-3 h-full py-10 ${isModalOpen ? " opacity-20" : ""}`}>
            <div className="w-full flex justify-end">
              <button
                onClick={toggleModal}
                className="block text-white bg-[#030337] border border-1 border-[#030337] hover:bg-transparent hover:text-[#030337]  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                type="button"
              >
                Add Category
              </button>
            </div>

            <ul className="list-decimal">{rederCategories(categoryData)}</ul>

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
                      Add New Category
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
                      value={categoryName}
                      onChange={handleChange}
                    />
                    <select
                      name="Select Catgory"
                      value={parentCategoryId}
                      onChange={(e) => setparentCategoryId(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {createCategoryList(categoryData).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="file"
                      name="CategoryImage"
                      ref={fileInputRef}
                      onChange={handleCategoryImage}
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
                    {/* <button
                  onClick={declineHandler}
                  type="button"
                  className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Ca
                </button> */}
                  </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Category;
