import { Users } from 'lucide-react';
import { Wifi } from 'lucide-react';
import room_one from "../assets/room_1.jpeg"
import { Link } from 'react-router'
import { useEffect, useState } from 'react';
import room_two from "../assets/room_two.jpeg"
import room_three from "../assets/room_three.jpeg"
import api from "./API/api";

function Room_Section() {

    //get rooms from backend
    const [rooms_object, set_rooms_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        // set_is_loading(true)
        get_all_rooms()
    }, [])

    const get_all_rooms = async () => {
        // set_is_loading(true)
        try {
            const response = await api.get("/get_room")
            const rooms = response.data.rooms
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



    function Handle_Rooms(e) {
        const target_room = e.target.closest(".cards")
    }
    return (
        <section className="mt-[4rem] max-w-[1300px] mx-auto flex flex-col">
            <h2 className="text-[36px] leading-[40px] font-[700] text-[rgb(17,24,39)] font-inter-sans text-center">Our Premium Rooms</h2>
            <p className="font-[400] text-[18px] leading-[28px] text-[rgb(75,85,99)] font-inter-sans text-center mt-[1rem]">Choose from our selection of carefully curated accommodations.</p>
            {/* I made this div responsive in the app.css file */}
            <div id='rooms_home' className="room_cards grid grid-cols-3 mx-[2rem] gap-5 mt-[3rem] ">

                {/* loading animation  */}
                
                <div className={`${is_loading ? "block" : "hidden"}`}>
                    <div className="w-full max-w-sm rounded-xl p-4 shadow animate-pulse">
                        {/* Image Skeleton */}
                        <div className="h-48 w-full bg-gray-300 rounded-xl"></div>

                        {/* Title Skeleton */}
                        <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>

                        {/* Subtitle Skeleton */}
                        <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>

                        {/* Guests Icon + Text */}
                        <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>

                        {/* Price Skeleton */}
                        <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                    </div>
                </div>

                <div className={`${is_loading ? "block" : "hidden"}`}>
                    <div className="w-full max-w-sm rounded-xl p-4 shadow animate-pulse">
                        {/* Image Skeleton */}
                        <div className="h-48 w-full bg-gray-300 rounded-xl"></div>

                        {/* Title Skeleton */}
                        <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>

                        {/* Subtitle Skeleton */}
                        <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>

                        {/* Guests Icon + Text */}
                        <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>

                        {/* Price Skeleton */}
                        <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                    </div>
                </div>

                <div className={`${is_loading ? "block" : "hidden"}`}>
                    <div className="w-full max-w-sm rounded-xl p-4 shadow animate-pulse">
                        {/* Image Skeleton */}
                        <div className="h-48 w-full bg-gray-300 rounded-xl"></div>

                        {/* Title Skeleton */}
                        <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>

                        {/* Subtitle Skeleton */}
                        <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>

                        {/* Guests Icon + Text */}
                        <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>

                        {/* Price Skeleton */}
                        <div className="mt-4 h-6 w-20 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>

            <div id='rooms_home' className="room_cards grid grid-cols-3 mx-[2rem] gap-5 mt-[3rem] ">
                {rooms_object.map((room) => {

                    const payload = { id: room.id, title: room.room_name, price: room.room_per_night_cost, img: room.room_picture, persons: room.room_capacity, room_aminity: room.room_aminity};
                    return (
                        <>
                            <div key={room.id} className={`${is_loading ? "hidden" : "block"} cards bg-[#fff] rounded-[10px] relative overflow-hidden shadow-md`}>
                                <div className='overflow-hidden'>
                                    <img className=' w-full overflow-hidden transform transition-transform align-middle duration-500 ease-out hover:scale-105 h-[12rem] object-cover max-w-full' src={`http://localhost:8000/uploads/${room.room_picture}`} alt="" />
                                </div>
                                <div className='absolute top-[8px] right-[17px] bg-[#f6f2ed] rounded-[20px]'>
                                    <h2 className='px-3 py-1 text-[rgb(79,70,229)] font-[600] text-[14px] leading-[20px] font-inter-sans'>${room.room_per_night_cost}</h2>
                                </div>
                                <div className="room_details p-[1.5rem] overflow-hidden">
                                    <h2 className='font-[600] text-[20px] mb-[0.8rem] text-[rgb(31,41,55)] leading-[28px] font-inter-sans'>{room.room_name}</h2>
                                    <p className='text-[rgb(75,85,99)] font-[400] text-[14px] leading-[20px] font-inter-sans'>{room.room_name}</p>

                                    <div className='flex gap-1 items-center mt-[0.8rem] mb-[0.4rem]'>
                                        <Users className='w-[16px]' color='rgb(75,85,99)' />
                                        <p className='text-[rgb(107,114,128)]  font-[400] text-[14px] leading-[20px] font-inter-sans'>Up to {room.room_capacity} guests</p>
                                    </div>

                                    <div className={`${room.wifi ? "flex" : "hidden"} items-center mt-[0.7rem] gap-1 bg-[#f3f4f6] w-fit px-[5px] py-[1px]`}>
                                        <Wifi className='w-[14px]' color='black' />
                                        <p className='text-black text-[12px] leading-[16px] font-[400] font-inter-sans'>Wi-Fi</p>
                                    </div>
                                    <hr className="border-0 h-[1px] bg-[#f3f4f6] my-[1rem]" />
                                    <Link to="/room_details" state={{ room: payload }}>
                                        <button onClick={(e) => Handle_Rooms(e)} className='text-[rgb(255,255,255)] cursor-pointer font-[400] text-[16px] leading-[24px] font-inter-sans bg-[#4f46e5] w-full rounded-[5px] py-[0.5rem]'>View Details</button>
                                    </Link>
                                </div>
                            </div>

                        </>
                    )
                })}






            </div>
            {/* I made this div responsive in the app.css file */}

            <div className='mx-auto'>
                <Link to="room_book">
                    <button className='text-[rgb(255,255,255)] cursor-pointer my-[3rem] font-[400] text-[16px] leading-[24px] font-inter-sans bg-[#4f46e5] rounded-[5px] py-[0.5rem] px-[1.3rem]'>View All Rooms</button>
                </Link>
            </div>






        </section>
    )
}

export default Room_Section