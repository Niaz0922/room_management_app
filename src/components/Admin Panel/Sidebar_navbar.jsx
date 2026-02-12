import navbar_logo from "../../assets/navbar_logo.png"
import { House } from 'lucide-react';
import { Building } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { File } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Link } from 'react-router'
import { X } from 'lucide-react';
import { useState } from "react";


function Sidebar_navbar() {

    const url = window.location.href;
    const page_name = url.replace("http://localhost:5173/", "");
    const side_bar_items = [
        { id: 1, item: "Dashboard", img: House },
        { id: 2, item: "Rooms", img: Building },
        { id: 3, item: "Bookings", img: Calendar },
        { id: 4, item: "Accounts", img: DollarSign },
        { id: 5, item: "Reports", img: File },
        { id: 6, item: "Settings", img: Settings },
    ]


    return (
        <>


            <aside
                id="default-sidebar"
                className={`absolute top-[66px] left-0 z-40 w-64 h-screen transition-transform translate-x-0 max-[1020px]:-translate-x-full`}
                aria-label="Sidebar"
            >
                <div className="bg-[#312e81] flex items-center py-2 px-3">
                    <img className="w-[3rem] h-[3rem] cursor-pointer" src={navbar_logo} alt="" />
                    <h2 className="text-[20px] leading-[28px] font-[700] text-white font-inter-sans">Admin Panel</h2>
                    <X onClick={(e)=> {console.log(e.target.closest("#default-sidebar").classList.add("max-[1020px]:-translate-x-full"))}} className="cursor-pointer block smd640:hidden ml-2" color="white" />
                </div>

                <div className="h-full px-3 py-4 overflow-y-auto bg-[#3730a3] pt-10">
                    {side_bar_items.map((side_bar_items_para) => (
                        <li
                            key={side_bar_items_para.id}
                            className="space-y-2 font-medium mt-2 mx-auto list-none"
                        >
                            <Link to={`/${side_bar_items_para.item}`}>
                                <div
                                    className={`flex gap-3 items-center ${page_name == side_bar_items_para.item ? "bg-[#312e81]" : ""
                                        } py-3 pl-4 rounded-[7px] cursor-pointer`}
                                >
                                    <side_bar_items_para.img
                                        className="w-[1.3rem]"
                                        color="white"
                                    />
                                    <span
                                        className={`text-white text-[14px] ${page_name == side_bar_items.item
                                                ? ""
                                                : "opacity-85 font-[300]"
                                            } leading-[20px] font-inter-sans`}
                                    >
                                        {side_bar_items_para.item}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </div>
            </aside>
        </>
    )
}

export default Sidebar_navbar;