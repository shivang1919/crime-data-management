// import React from 'react'

// const Navbar = () => {
//   const Links = [
//     {name:"Report Crime"},
//     {name:"F.I.R."},
//     {name:"Missing Person Bureau"},
//     {name: "Sign In"}
//   ]
//   return (
//     <div className='flex justify-between items-center pt-5 pb-5 px-10 border-solid border-4 border-white rounded-md'>
//       <h1 className='w-full text-3xl font-bold text-[#FEE715FF]'>PRMS</h1>
//       <ul className='bg-[#ffffff14] backdrop-blur-lg md:pl-14 pr-14 pt-1 z-10 flex '>
//         {
//           Links.map((link,index)=>(
//             <li key={index} className="md:inline-block md:ml-10 ml-10 mr-10 border-b-4 border-transparent hover:border-white duration-300">
//               <a href="#" className='text-white text-sm   inline-block'>{link.name}</a>
//             </li>
//           ))
//         }

//       </ul>
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from "react";

const Navbar = () => {
  const [isExpanded, toggleExpansion] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#ffb049] p-6 relative border-solid border-b-4 border-white ">
      <div className=" items-center flex-shrink-0 text-white mr-6 text-2xl font-bold">
        <h2>PRMS</h2>

      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className={`${isExpanded ? `block  ` : `hidden absolute right-16`
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto `}>
        <div className="text-base font-semibold lg:flex-grow ">
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447] mr-5">
          Report Crime 
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
          F.I.R. 
          </a>
    
          <a href="/missingpersonbureau" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
          Missing Person Bureau 
          </a>
    
          <a href="/signin" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
          Sign In 
          </a>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;