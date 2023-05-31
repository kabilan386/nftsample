import React, { useContext, useState } from "react";
import MyRouter from "routers/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiContext } from "./Context/ApiContext";

function App() {

  const [apiData, setApiData] = useState("")
 
  return (
    <ApiContext.Provider value={{ apiData, setApiData }}>
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <ToastContainer />
      <MyRouter />
    </div>
   </ApiContext.Provider>
  );
}

export default App;
