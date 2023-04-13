import React, { useState } from "react";

const NavbarPolice = () => {
    const [isExpanded, toggleExpansion] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-[#ff9c1bfe] p-6 border-solid border-b-4 border-white sticky top-0 z-50">
            <div className=" items-center flex-shrink-0 text-white mr-6 text-3xl font-bold">
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
            <div className={`${isExpanded ? `block  togglebar` : `hidden absolute right-16`
                } w-full block flex-grow lg:flex lg:items-center lg:w-auto `}>
                <div className="text-lg font-semibold lg:flex-grow ">
                    {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447] mr-5">
            Report Crime
          </a> */}

                    <div className="dropdown mr-5">
                        <button className="dropbtn">F.I.R.</button>
                        <div className="dropdown-content">
                            <a href="/signin/police/login/fir">New F.I.R.</a>
                            <a href="/">Past F.I.R.</a>
                        </div>
                    </div>
                    {/* <a href="/signin/police/login/fir" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
                        F.I.R.

                    </a> */}
                    

                    <div className="dropdown mr-5">
                        <button className="dropbtn">Missing Person Bureau</button>
                        <div className="dropdown-content">
                            <a href="/signin/police/login/missingpersonbureau">New Case</a>
                            <a href="/">Past Case</a>
                        </div>
                    </div>


                    {/* <a href="/missingpersonbureau" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
                        Missing Person Bureau
                    </a> */}

                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#0B2447]  mr-5">
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    )
}


export default NavbarPolice;