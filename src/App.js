import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Layout from "./Layout";
import AllRouter from "./Router/AllRouter";
import { useEffect, useState } from "react";
import { loginReducer } from "./redux/reducers/auth";
import { categoryReducer } from "./redux/reducers/category";
import { productReducer } from "./redux/reducers/product";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [iscategorryAdded, setiscategorryAdded] = useState(false);
  const [isproductAdded, setisproductAdded] = useState(false);
  const { isauth } = useSelector((state) => state.root.logindata);
  const {categoryData}=useSelector((state)=>state.root.categorydata)
  // console.log("category Daataa",categoryData)
  console.log("is category added",iscategorryAdded)
  const dispatch = useDispatch();
  console.log("tokennnnn", token);
  const d = () => {
    dispatch(loginReducer(true));
  };
  useEffect(() => {
    // if (token && !isauth) {
      console.log("is use effect", token, isauth);
      // d();
    // }
  }, [isauth,token]);

  useEffect(() => {
    const getCategory=async()=>
    {
      try{
        const response=await axios.get("http://localhost:2000/api/category/getcat")
        // console.log("respionsese",response.data.category)
        if(response.data.category)
        {
          const data=response.data.category;
          dispatch(categoryReducer(data))

        }
      }
      catch(err)
      {
        console.log("error",err)
      }

    }
    getCategory()
    setiscategorryAdded(false)
  }, [iscategorryAdded])
  
  useEffect(() => {
    const getProduct=async()=>
    {
      try{
        const response=await axios.get("http://localhost:2000/api/product/getproduct")
        // console.log("respionsese",response.data.category)
        if(response.status)
        {
          const data=response.data.product;
          dispatch(productReducer(data))
          console.log("productttttt",data)

        }
      }
      catch(err)
      {
        console.log("error",err)
      }

    }
    getProduct()
    setisproductAdded(false)
  }, [isproductAdded])
  

  return (
    <Layout setToken={setToken}>
      <AllRouter setToken={setToken} token={token} setiscategorryAdded={setiscategorryAdded} setisproductAdded={setisproductAdded}/>
    </Layout>
  );
}

export default App;
