import navbar_logo from "../assets/navbar_logo.png"
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useEffect, useState } from "react";
import { data, Link } from 'react-router'

function Navbar() {
    const d = new Date();
    let time = d.getTime();
    if (localStorage.getItem('token')) {
        if (time > JSON.parse(localStorage.getItem('token')).time) {
            localStorage.removeItem("token")
        }
    }



    function Handle_Menu_Button(e) {

        const header = e.target.closest("header");
        const main = e.target.closest("main");
        const menuHamburger = main.querySelector("#menu_hamburger");
        const menuIcon = document.querySelector(".menu_icon");
        const xIcon = document.querySelector(".x_icon");

        if (e.target.id === "menu_icon_id") {
            // Set header border
            header.style.borderBottom = "1px solid #6366f1";

            // Toggle visibility using Tailwind classes
            menuHamburger.classList.remove("hidden");
            menuIcon.classList.add("hidden");
            xIcon.classList.remove("hidden");
        } else {
            // Set header border
            header.style.borderBottom = "none";

            // Toggle visibility using Tailwind classes
            menuHamburger.classList.add("hidden");
            menuIcon.classList.remove("hidden");
            xIcon.classList.add("hidden");
        }

    }





    const [is_logged_in, set_is_logged_in] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("token");
        set_is_logged_in(auth);
    }, [])



    return (

        <main>
            <header className="bg-[#4f46e5]">
                <nav className="max-w-[1340px] mx-auto  flex items-center justify-between px-[2rem]">
                    <div className="flex items-center gap-14">
                        <Link to="/">
                            <div className="logo flex  py-[0.6rem] items-center">

                                <img className="w-[3rem] h-[3rem] cursor-pointer" src={navbar_logo} alt="" />


                                <h2 className="leading-[28px] text-[20px] font-[700] text-white font-inter-sans">RoomBooker</h2>
                            </div>
                        </Link>
                        <Link to="room_book">
                            <div>
                                <p className="text-white smex:flex hidden text-[14px] font-[500] cursor-pointer leading-[20px] font-inter-sans">Rooms</p>
                            </div>
                        </Link>
                    </div>
                    <div className="user flex gap-7 smex:flex items-center hidden">
                        <Link to="/Dashboard">
                            <p className={`text-white cursor-pointer ${is_logged_in ? "block" : "hidden"} text-[14px] font-[500] leading-[20px] font-inter-sans`}>Admin Panel</p>
                        </Link>
                        <p className={`text-[rgb(224,231,255)] ${is_logged_in ? "block" : "hidden"} font-[400] text-[14px] leading-[20px] font-inter-sans`}>Welcome, {localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).admin_name : ""}</p>
                        <Link to="/logout">
                            <p className={`text-white text-[14px] ${is_logged_in ? "block" : "hidden"} font-[500] leading-[20px] font-inter-sans`}>Logout</p>
                        </Link>
                        <Link to="/login">

                            <p className={`text-white text-[14px] ${is_logged_in ? "hidden" : "block"} font-[500] leading-[20px] font-inter-sans`}>Login</p>
                        </Link>


                    </div>

                    <div className="menu smex:hidden block cursor-pointer">
                        <Menu id="menu_icon_id" className="menu_icon smex:hidden block" onClick={(e) => Handle_Menu_Button(e)} color="white" />
                        <X id="x_icon_id" className="x_icon hidden" onClick={(e) => Handle_Menu_Button(e)} color="white" />
                    </div>




                </nav>

            </header>

            <div id="menu_hamburger" className="menu hidden smex:hidden">
                <div className="w-full bg-indigo-600 text-white p-4 space-y-4">
                    <div className="space-y-2">
                        <Link to="/">
                            <p className="block cursor-pointer hover:underline">Rooms</p>
                        </Link>
                        <Link to="/Dashboard">
                            <p className="block cursor-pointer hover:underline">Admin Panel</p>
                        </Link>
                    </div>
                    <hr className="border-[#6366f1]" />
                    <div>
                        <p className="font-medium">Admin</p>
                        <p className="text-sm text-indigo-200">Welcome, {localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).admin_name : ""}</p>
                    </div>
                    <Link to="/logout">
                        <div className="flex cursor-pointer items-center space-x-2 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3h-9m0 0l3-3m-3 3l3 3" />
                            </svg>
                            <span>Logout</span>
                        </div>
                    </Link>

                </div>

            </div>
        </main>



    )
}
export default Navbar