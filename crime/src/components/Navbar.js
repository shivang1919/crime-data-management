import React from 'react'

const Navbar = () => {
  const Links = [
    {name:"Report Crime"},
    {name:"F.I.R."},
    {name:"Missing Person Bureau"},
    {name: "Sign In"}
  ]
  return (
    <div className='flex justify-between items-center pt-5 pb-5 px-10 border-solid border-4 border-white rounded-md'>
      <h1 className='w-full text-3xl font-bold text-[#FEE715FF]'>PRMS</h1>
      <ul className='bg-[#ffffff14] backdrop-blur-lg md:pl-14 pr-14 pt-1 z-10 flex '>
        {
          Links.map((link,index)=>(
            <li key={index} className="md:inline-block md:ml-10 ml-10 mr-10 border-b-4 border-transparent hover:border-white duration-300">
              <a href="#" className='text-white text-sm   inline-block'>{link.name}</a>
            </li>
          ))
        }
        
      </ul>
    </div>
  )
}

export default Navbar
