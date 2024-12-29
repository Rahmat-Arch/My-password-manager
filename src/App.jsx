import { parse } from 'postcss';
import React, { useEffect, useState } from 'react';

function App() {
  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [imgSource, setImgSource] = useState("https://cdn-icons-png.flaticon.com/128/9726/9726597.png");
  const [passwordType, setPasswordType] = useState("password");
  const [passArray, setPassArray] = useState([]);

  //This function be below is used save the data wheneve the passArray is changed
  useEffect(() => {
    // Load passArray from localStorage on initial mount
    try {
      const psArray = localStorage.getItem('passArray');
      setPassArray(psArray ? JSON.parse(psArray) : []); // Fallback to empty array if no data
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      setPassArray([]);
    }
  }, []);
  
  // Save passArray to localStorage, but only after it's updated post-load
  useEffect(() => {
    if (passArray !== null) {
      try {
        console.log("Saving to localStorage:", passArray);
        localStorage.setItem('passArray', JSON.stringify(passArray));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [passArray]);
  // Fix: Use empty dependency array
  
  function HandleEye() {
    setImgSource((prevSource) =>
      prevSource === "https://cdn-icons-png.flaticon.com/128/2874/2874802.png"
        ? "https://cdn-icons-png.flaticon.com/128/9726/9726597.png"
        : "https://cdn-icons-png.flaticon.com/128/2874/2874802.png"
    );
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  }

  function HandleSubmit(e) {
    e.preventDefault();
    setPassArray([...passArray, form]);
    setForm({ url: "", username: "", password: "" });
  }


  function HandleFormChange(e){
    const{name,value}=e.target
    setForm((p)=> ({...p,[name]: value}))
  }

  return (
    <div className='bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-[100vh]'>
      <form action="" onSubmit={HandleSubmit}>
        <div className='flex flex-col'>
          <h1 className='text-center py-6 text-3xl '>PassOP</h1>
          <div className='flex flex-wrap gap-4 mx-auto bg-slate-300 rounded p-5 shadow-lg border-blue-400 border-2'>
            <input
              name='url'
              value={form.url}
              onChange={(e)=>HandleFormChange(e)}
              placeholder='Enter your url...'
              type="text"
              className='text-black rounded px-5 py-1 my-2 sm:w-full'
            />
            <input
              name='username'
              value={form.username}
              onChange={(e)=>HandleFormChange(e)}
              placeholder='Enter your Username...'
              type="text"
              className='text-black rounded px-5 py-1 my-2'
            />
            <div className="relative">
              <input
                name='password'
                value={form.password}
                onChange={(e)=>HandleFormChange(e)}
                placeholder="Enter Password"
                type={passwordType}
                className="text-black rounded px-5 py-1 my-2 pr-10"
              />
              <img
                onClick={HandleEye}
                className="w-5 absolute top-1/2 right-2 -translate-y-1/2"
                src={imgSource}
                alt="Icon"
              />
            </div>
          <button type='submit'>Submit</button>
          </div>
        </div>
        
      </form>
      <div className='text-base:mx-20 rounded-2xl p-6'>
  <h1 className='text-center text-white text-3xl mb-4'>Saved Credentials</h1>
  {passArray.length > 0 ? (
    passArray.map((item, index) => {
      return (
        <div
          key={index}
          className='flex flex-col md:w-[90vh] md:flex-row my-5 justify-between items-center p-2 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-xl shadow-lg text-white'
        >
          <h1 className='px-4 text-wrap py-2 font-semibold w-full md:w-auto text-center'>
            {item.url}
          </h1>
          <h1 className='px-4 py-2 font-semibold w-full md:w-auto text-center mt-4 md:mt-0'>
            {item.username}
          </h1>
          <h1 className='px-4 py-2 font-semibold w-full md:w-auto text-center mt-4 md:mt-0'>
            {item.password}
          </h1>
        </div>
      );
    })
  ) : (
    <p className='text-center text-white text-lg'>No saved credentials yet. Add some!</p>
  )}
</div>

    </div>
  );
}

export default App;