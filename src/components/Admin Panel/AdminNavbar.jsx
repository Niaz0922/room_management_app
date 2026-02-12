import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from 'lucide-react';



function AdminNavbar() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("token"))) {
            navigate("/access_error")
        }
    }, [])
    const url = window.location.href;
    const page_name = url.replace("http://localhost:5173/", "");



    
    

    return (
        <>
            <header id="admin_nav" className="flex justify-between ml-auto border-b-[1.2px] border-[rgb(229,231,235)] bg-white shadow-md py-4 px-8 exsm:px-4">
                <div className="flex items-center gap-3">
                    <Menu onClick={() => {document.querySelector("#default-sidebar").classList.remove("max-[1020px]:-translate-x-full")}} className="cursor-pointer block smd640:hidden"></Menu>
                    <h2 className="text-[rgb(17,24,39)] font-[600] text-[24px] leading-[32px] font-inter-sans">{page_name}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-[rgb(55,65,81)] font-[400] text-[14px] leading-[20px] font-inter-sans exsm:dispaly-0">Welcome, admin</p>
                    <h2 className="bg-[#4f46e5] rounded-[50%] text-white text-[14px] w-[2rem] h-[2rem] flex justify-center items-center">
                        <p>A</p>
                    </h2>
                </div>
            </header>
        </>
    )
}

export default AdminNavbar