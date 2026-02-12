import Navbar from "./Navbar"
import Footer from "./Footer"
import room_one from "../assets/room_1.jpeg"
import {Route, Wifi } from 'lucide-react';
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from "react";
import '../App.css'
import { Clock } from 'lucide-react';
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from "./API/api";
import { Link } from 'react-router'


function Room_details() {
    const navigate = useNavigate();
    const location_object = useLocation(); // ✅ declare hooks at the top

    useEffect(() => {
        if (location_object.state === null) {   // safer than === null
            navigate("/room_book");
        }
    }, []);



    //check in calender
    const [check_In_date, setInDate] = useState(new Date);

    //check out calender . the check out calender date must be 1 day after of check in date

    const [check_Out_date, setOutDate] = useState(useEffect(() => {
        const newCheckOut = new Date(check_In_date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        setOutDate(newCheckOut);
    }, [check_In_date]));


    // Whenever check-in date changes, update check-out date
    useEffect(() => {
        const newCheckOut = new Date(check_In_date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        setOutDate(newCheckOut);
    }, [check_In_date]);



    //getting the nights count

    const location = useLocation();
    const room = location.state?.room; // The object you passed
    const room_price = room.price.replace("/night", "");


    //the difference of checkout date and check in date in days
    const [nights, setNights] = useState(1)


    useEffect(() => {
        const date1 = check_In_date;
        const date2 = check_Out_date;

        const ms = date2 - date1.getTime();
        const oneDay = 1000 * 60 * 60 * 24;

        const diffInDays = Math.round(ms / oneDay);
        setNights(diffInDays)
    }, [check_In_date, check_Out_date])

    //setting the total price 
    const [price, set_price] = useState(room_price)
    const [total_price, set_total_price] = useState(room_price)


    useEffect(() => {
        const price_result = Number(String(price ? price : "0").replace(/[^0-9.]/g, ""));
        const sum_price = price_result * nights;
        set_total_price(sum_price);
    }, [nights])



    return (
        <>
            <Navbar />

            <section className="mt-0 smds:mt-4r max-w-[1300px] mx-auto flex flex-col shadow-md mb-[3rem]  ">
                <div class="flex flex-col md:flex-row bg-white border-b-[1px] border-[#e5e7eb]">

                    <div class="md:w-1/3 overflow-hidden">
                        <img
                            src={`http://localhost:8000/uploads/${room.img}`}
                            alt="room"
                            class="w-full h-72 object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                        <div class="absolute top-4 right-6 hidden md:block"></div>
                    </div>


                    <div class="p-8 md:w-2/3 relative">
                        <div class="absolute top-6 right-6">
                            <div class="px-2 text-[30px] leading-[36px] font-[600] text-[rgb(79,70,229)]">${room_price}</div>
                            <div class=" text-[16px] font-[400] leading-[24px] text-[rgb(107,114,128)]">per night</div>
                        </div>

                        <h1 class="text-2xl font-semibold text-slate-900 mb-2">{room.title}</h1>
                        <p class="text-sm text-slate-500 mb-4">{room.title}</p>
                        <hr className="mb-4 border-0 h-[1px] bg-[#e5e7eb]" />

                        <div class="flex items-center gap-2 text-slate-500 mb-8">

                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 11a4 4 0 100-8 4 4 0 000 8zM17 11a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                            <span class="text-[16px] text-[rgb(55,65,81)] leading-[24px] font-[400] font-inter-sans">Capacity: {room.persons} people</span>
                        </div>

                        <div class="flex flex-col justify-center gap-3">
                            <h2 className="font-[400] text-[rgb(17,24,39)] text-[18px] leading-[28px] font-inter-sans">Amenities</h2>
                            <div class="flex items-center gap-2 px-2 py-1 rounded">


                                {JSON.parse(room.room_aminity).map((amenity, index) => {
                                    return (
                                        <>
                                            <span
                                                key={index}
                                                className="border px-3 py-1 rounded text-sm text-gray-600 mr-2"
                                            >
                                                {amenity}
                                            </span>
                                        </>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="form p-6 bg-[#f9fafb]">
                    <h2 className="text-[rgb(17,24,39)] font-[400] text-[18px] leading-[28px] font-inter-sans">Book This Room</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center mt-5">
                        <div>
                            <label class="text-[14px] leading-[20px] font-[400] font-inter-sans text-[rgb(55,65,81)] mb-2 block">Check-in Date (12:00 PM)</label>
                            <div class="relative">
                                <Calendar minDate={new Date()} className="w-full shadow" value={check_In_date} onChange={(e) => setInDate(e.value)} showIcon />
                            </div>
                        </div>

                        <div>
                            <label class="text-[14px] leading-[20px] font-[400] font-inter-sans text-[rgb(55,65,81)] mb-2 block">Check-in Date (12:00 PM)</label>
                            <div class="relative">
                                <Calendar minDate={check_In_date} className="w-full shadow" value={check_Out_date} onChange={(event) => setOutDate(event.value)} showIcon />
                            </div>
                        </div>
                    </div>

                    <div className="w-full mx-auto mt-10 bg-[#f9fafb] rounded-md shadow-sm">
                        <div className="px-6 py-4 space-y-3">
                            {/* Price per night */}
                            <div className="flex justify-between">
                                <span className="text-gray-700">Price per night</span>
                                <span className="price_of_room text-gray-900 font-medium">{room_price}</span>
                            </div>

                            {/* Nights */}
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="text-gray-700">Nights</span>
                                <span onChange={(e) => Calculate(e)} className="text-gray-900 font-medium">{nights}</span>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between">
                                <span className="text-gray-700 font-medium">Total</span>
                                <span className="text-gray-900 font-medium">${total_price}</span>
                            </div>
                        </div>

                        {/* Button */}
                        <Link to="http://localhost:5173/room_book">
                            <button className="w-full bg-[#4f46e5] mt-8 hover:bg-indigo-700 text-white py-3 rounded-md text-center font-medium">
                                Book Now
                            </button>
                        </Link>

                    </div>
                </div>


            </section>


            <Footer />
        </>
    )
}

export default Room_details;