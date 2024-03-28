import React, { useEffect } from "react";
import {apiUrl, filterData} from "./data";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner"
// import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    try{
      let response =  await fetch(apiUrl);
      let output = await response.json();
      //output
      setCourses(output.data);
    }
    catch(error){
      toast.error("error occured!");
    }
    setLoading(false);
  }

  useEffect(() =>{
    fetchData();
  },[])
  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <Filter filterData={filterData}
                category={category}
                setCategory={setCategory}
                />
      </div>
      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
        {
          loading ?(<Spinner/>):(<Cards courses={courses} category={category}/>)
        }
      </div>
    </div>

  )
}

export default App;