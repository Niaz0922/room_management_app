import Navbar from "./Navbar"
import Footer from "./Footer"
import { Users } from 'lucide-react';
import { Wifi } from 'lucide-react';
import room_one from "../assets/room_1.jpeg"
import { Clock } from 'lucide-react';
import check_icon from "../assets/check_icon.png"
import { useEffect, useState } from "react";
import Form_Room_books from "./Form_Room_books";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'

import api from "./API/api";

function Room_Book() {
    const [rooms_object, set_rooms_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        // set_is_loading(true)
        get_all_rooms()
    }, [])

    const [selectedId, setSelectedId] = useState(26);


    const get_all_rooms = async () => {
        // set_is_loading(true)
        try {
            const response = await api.get("/get_room")
            const rooms = response.data.rooms
            setSelectedId(rooms[0].id)
            set_rooms_object(rooms)
        }

        catch {
            console.log("Error")
        }

        finally {
            setTimeout(() => {
                set_is_loading(false);
            }, 800);
        }
    }


    






    return (
        <>
            <Navbar />
            <section className="mt-[4rem] max-w-[1300px] mx-auto flex flex-col bg-white p-6 shadow-md mb-[3rem]">
                <div className="header_text flex flex-col">
                    <h2 className="text-[rgb(17,24,39)] font-[700] text-[24px] leading-[32px] font-inter-sans">Book Your Stay</h2>
                    <div className="flex items-center gap-1 mt-2 mb-6">
                        <Clock className="w-[1rem]" color="rgb(75,85,99)" />
                        <p className="text-[rgb(75,85,99)] font-[400] text-[14px] leading-[20px] font-inter-sans">Check-in: 12:00 PM | Check-out: 12:00 PM</p>
                    </div>
                    <p className="font-[500] text-[rgb(17,24,39)] text-[18px] leading-[28px] font-inter-sans">Select a Room</p>
                </div>
                <div className="room_cards  mt-[1rem] ">



                    <div id='rooms_home' className="rooms grid grid-cols-3 gap-5 rounded-[10px]">

                        {/* loading animation  */}

                        <div className={`${is_loading ? "block" : "hidden"} w-full max-w-sm rounded-xl p-4 shadow animate-pulse`}>
                            <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
                            <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
                            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                            <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                        </div>

                         <div className={`${is_loading ? "block" : "hidden"} w-full max-w-sm rounded-xl p-4 shadow animate-pulse`}>
                            <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
                            <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
                            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                            <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                        </div>

                         <div className={`${is_loading ? "block" : "hidden"} w-full max-w-sm rounded-xl p-4 shadow animate-pulse`}>
                            <div className="h-48 w-full bg-gray-300 rounded-xl"></div>
                            <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
                            <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                            <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>
                            <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                        </div>

                    </div>

                    <div id='rooms_home' className="rooms grid grid-cols-3 gap-5 rounded-[10px]">

                        {rooms_object.map((room) => {
                            const isSelected = selectedId === room.id;

                            return (
                                <>
                                    <div id={room.id} key={room.id} onClick={() => setSelectedId(room.id)} className={`${is_loading ? "hidden" : "block"} cards cursor-pointer transition duration-400 ease-out bg-[#fff] rounded-[10px] ${isSelected ? "active border-[rgb(79,70,229)] border-[2px] ring-2 ring-[rgb(79,70,229)] border-transparent" : "border-none"} overflow-hidden shadow-md relative`}>
                                        <div className={`overflow-hidden`}>
                                            <img id="picture" className=' w-full overflow-hidden transform transition-transform align-middle duration-200 ease-out hover:scale-105 h-[12rem] object-cover max-w-full' src={`http://localhost:8000/uploads/${room.room_picture}`} alt="" />
                                        </div>

                                        <div className="room_details p-[1.5rem] overflow-hidden">
                                            <h2 className='font-[400] text-[18px] mb-[0.4rem] text-[rgb(17,24,39)] leading-[28px] font-inter-sans'>{room.room_name}</h2>
                                            <p className='title text-[rgb(75,85,99)] font-[400] text-[14px] leading-[20px] font-inter-sans'>{room.room_name}</p>

                                            <div className='flex gap-1 items-center mt-[0.4rem] mb-[0.4rem]'>
                                                <Users className='w-[16px]' color='rgb(75,85,99)' />
                                                <p className='text-[rgb(107,114,128)]  font-[400] text-[14px] leading-[20px] font-inter-sans'>Up to {room.room_capacity} guests</p>
                                            </div>
                                            <input className="room_description" type="hidden" value={room.room_desc}/>
                                            <div className='mt-[0.5rem] w-fit'>
                                                <p className="price text-[rgb(79,70,229)] text-[18px] leading-[28px] font-[700] font-inter-sans">${room.room_per_night_cost}</p>
                                            </div>
                                        </div>

                                        <div className={`check_icon absolute ${isSelected ? "block" : "hidden"} right-[7px] top-[5px]`}>
                                            <img className="w-6 rounded-[50%]" src={check_icon} alt="" />
                                        </div>
                                    </div>


                                </>
                            )
                        })}





                    </div>
                </div>

                <Form_Room_books id={selectedId} is_loading = {is_loading} room_object = {rooms_object}/>
            </section>





            <Footer />
        </>
    )
}

export default Room_Book




