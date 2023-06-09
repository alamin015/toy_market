import React, { useEffect, useState } from "react";
import SingleDoll from "../../Components/SingleDoll/SingleDoll";
import useTitle from "../../Hooks/useTitle";
import Spinner from "../../Spinner/Spinner";

const AllToys = () => {
  const [toys, setToys] = useState([]);
  const [copy,setCopy] = useState([]);
  const [myLoader,setMyLoader] = useState(true);
  const [myFresh,setMyFresh] = useState(false)
  useTitle("All toys")
  useEffect(() => {
    fetch("https://toy-server-pearl.vercel.app/all")
      .then((res) => res.json())
      .then((data) => {
        setMyLoader(false)
        setCopy(data)
        setToys(data)
      });
  }, [myFresh]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const val = form.search.value
    if(val){
      const data = copy.filter((item) => {
        return  item.name.includes(form.search.value);
      })
      setMyLoader(false)
      setToys(data)
      form.reset();
    }else {
      setMyFresh(!myFresh);
      form.reset();
    }
    
  }

  if(myLoader){
    return <Spinner></Spinner>
  }

  return (
    <div className="py-14 container mx-auto px-0 md:px-3">
      <div className="mb-5 mt-3">
        <form onSubmit={handleSearch} className="max-w-[500px] mx-auto flex items-center">
          <input type="text" placeholder="Search here" className="p-2 border outline-0 w-full rounded-tl-lg rounded-bl-lg" name="search" />
          <button className="text-white py-2 px-8 rounded-tr-lg rounded-br-lg font-semibold font-Jost border border-primary bg-primary hover:bg-white hover:text-primary transition">Search</button>
        </form>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {toys &&
          toys.map((item) => (
            <SingleDoll item={item} key={item._id}></SingleDoll>
          ))}
      </div>
    </div>
  );
};

export default AllToys;
