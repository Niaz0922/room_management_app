import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import room_one from "../../assets/room_1.jpeg"
import { NotebookPen } from 'lucide-react';
import { Trash } from 'lucide-react';
import booking_image_one from "../../assets/booking.jpeg"
import { Eye } from 'lucide-react';
import { Search } from 'lucide-react';
import { Link } from 'react-router'
import { useEffect, useState } from "react";
import api from "../API/api";
import { useLocation, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Bookings() {

    const location = useLocation();
    const navigate = useNavigate();

    const [deleted_Status, set_deleted_Status] = useState(false);

    useEffect(() => {
        const is_deleted = location.state;

        if (is_deleted) {
            set_deleted_Status(true);
            navigate("/Bookings", { state: false, replace: true });
        }
    }, [location.state]); // also add dependency








    const [bookings_object, set_bookings_object] = useState([])
    const [rooms, set_rooms] = useState([])

    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        
        get_all_bookings()
        get_all_rooms()
    }, [])

    const get_all_bookings = async () => {
        
        try {
            const response = await api.get("/get_bookings")
            const bookings = response.data.all_bookings
            set_bookings_object(bookings)
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

    const get_all_rooms = async () => {
        set_is_loading(true)
        try {
            const response = await api.get("/get_room")
            const rooms = response.data.rooms
            set_rooms(rooms)
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




    useEffect(() => {
        get_bookings();
    }, []);
    const get_bookings = async () => {
        const booking_response = await api.get("get_booked_days");
        set_bookings_object(booking_response.data.all_bookings)
    }





    //Room Search functionality

    const [room_status, set_room_status] = useState("All Status")
    const [room_name_filter, set_room_name_filter] = useState("All Rooms")
    const [room_search, set_room_search] = useState("")

    function Handle_Room_status(e) {
        set_room_status(e.target.value)

    }

    function Handle_Room_Name(e) {
        set_room_name_filter(e.target.value)
    }

    function Handle_room_search(e) {
        set_room_search(e.target.value)
    }

    const [booking_show, set_booking_state] = useState("Bookings");

    function Handle_Bookings(e) {
        if (e.target.innerHTML == "Bookings") {
            set_booking_state("Bookings")
        } else if (e.target.innerHTML == "Calender") {
            set_booking_state("Calender")
        }
    }


    const [selected_room_name, set_selected_room_name] = useState("");

    useEffect(() => {
        if (bookings_object.length > 0) {
            set_selected_room_name(bookings_object[0].room_name);
        }
    }, [bookings_object]);



    // console.log(bookings_object)
    console.log(selected_room_name)


    const filteredBookings = bookings_object.filter(
        (b) => b.room_name === selected_room_name
    );

    function Check_Out_date(check_out_date) {
        const date = new Date(check_out_date)
        const checkout_date_for_calender = date.setDate(date.getDate() + 1)

        var year = new Date(checkout_date_for_calender).getFullYear();
        var month = new Date(checkout_date_for_calender).toLocaleString("default", { month: "2-digit" })
        var date_two_digit = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${date_two_digit}`
    }

    function check_in_date(check_in_date) {
        const date = new Date(check_in_date)
        const checkout_date_for_calender = date.setDate(date.getDate())

        var year = new Date(checkout_date_for_calender).getFullYear();
        var month = new Date(checkout_date_for_calender).toLocaleString("default", { month: "2-digit" })
        var date_two_digit = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${date_two_digit}`
    }

    const events = filteredBookings.map((b) => (
        {
            title: `${b.user_name} (${b.booking_id})`,
            start: check_in_date(b.check_in_date),   // DIRECT STRING
            end: Check_Out_date(b.check_out_date),   // ONLY +1 day
            color: "#ef4444",
        }
    ));






    return (
        <>
            <Navbar />
            <AdminNavbar />
            <Sidebar_navbar />


            <section id="dashboard_section" className={`relative w-full ml-auto h-screen overflow-y-scroll`}>
                <main class="flex flex-row justify-center gap-2 mt-6">
                    <button onClick={Handle_Bookings}
                        class={`${booking_show == "Bookings" ? "bg-black" : "bg-gradient-to-r from-blue-500 to-purple-600"} px-6 cursor-pointer py-2.5 rounded-lg text-white font-semibold
           
                        shadow-lg shadow-purple-300/50
                        hover:scale-105 transition`}
                    >
                        Bookings
                    </button>

                    <button disabled={is_loading} onClick={Handle_Bookings}
                        class={`${booking_show == "Calender" ? "bg-black" : "bg-gradient-to-r from-blue-500 to-purple-600"} px-6 cursor-pointer py-2.5 rounded-lg text-white font-semibold
                        shadow-lg shadow-purple-300/50
                        hover:scale-105 transition`}
                    >
                        Calender
                    </button>
                </main>

                <main className={`bookings ${booking_show == "Bookings" ? "block" : "hidden"}`}>
                    <div class={`${deleted_Status ? "flex" : "hidden"} flex mt-6 items-center gap-4 p-4 absolute right-4 rounded-md max-w-4xl mx-auto shadow-[0_2px_16px_-3px_rgba(144,144,144,0.4)] bg-white`} role="alert">
                        <span class="block absolute w-1 rounded-full h-[80%] my-auto top-0 bottom-0 left-2  bg-green-500"></span>
                        <div class="flex sm:items-center gap-4 ml-3 max-sm:flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-6 h-6 fill-green-500" viewBox="0 0 500 500">
                                <clipPath id="a">
                                    <path d="M0 0h500v500H0z" data-original="#000000" />
                                </clipPath>
                                <g clip-path="url(#a)">
                                    <path fill-rule="evenodd" d="M250 500c138.071 0 250-111.929 250-250S388.071 0 250 0 0 111.929 0 250s111.929 250 250 250zm-68.781-265.687c-10.545-10.544-27.64-10.544-38.184 0-10.544 10.545-10.544 27.64 0 38.184l66.468 66.468c10.544 10.544 27.639 10.544 38.184 0l127.279-127.279c10.544-10.544 10.544-27.64 0-38.184s-27.64-10.544-38.184 0L228.595 281.69z" clip-rule="evenodd" data-original="#000000" />
                                </g>
                            </svg>
                            <div>
                                <h6 class="text-slate-900 text-base font-medium">Success! Booking Deleted</h6>
                                <p class="text-slate-500 text-[13px] mt-1">The booking has been deleted successfuly.</p>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => set_deleted_Status(false)} class="shrink-0 w-[14px] h-[14px] ml-auto cursor-pointer fill-gray-400 hover:fill-red-400" viewBox="0 0 320.591 320.591">
                            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
                            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
                        </svg>
                    </div>
                    <h2 className="text-[rgb(17,24,39)] mt-15 font-[600] text-[24px] leading-[32px] exsm:ml-0 max-[1020px]:ml-[0rem] max-[1020px]:text-center ml-[10rem] exsm:text-center font-inter-sans">Manage Bookings</h2>

                    <main class={` max-w-[1350px] mx-auto shadow-sm`}>

                        <section class="bg-transparent p-4 ">
                            <div class="control p-4">
                                <form class="flex gap-[1rem] smds:flex-row flex-col">

                                    <div className="smds:w-40p w-full">
                                        <label for="status" class="block text-sm font-medium text-gray-600 mb-2">Status</label>
                                        <select id="status" name="status" onChange={Handle_Room_status} class="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                            <option>All Status</option>
                                            <option>Pending</option>
                                            <option>Confirmed</option>
                                            <option>Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="smds:w-40p w-full">
                                        <label for="room" class="block text-sm font-medium text-gray-600 mb-2">Room</label>
                                        <select id="room" name="room" onChange={Handle_Room_Name} class="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                            <option>All Rooms</option>
                                            {rooms.map((rooms) => {
                                                return (<>
                                                    <option>{rooms.room_name}</option>
                                                </>)
                                            })}


                                        </select>
                                    </div>

                                    <div className="w-[100%]">
                                        <label for="search" class="block text-sm font-medium text-gray-600 mb-2">Search</label>
                                        <div class="relative">
                                            <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <Search color="rgb(163,169,179)" />
                                            </span>


                                            <input id="search" name="search" onChange={Handle_room_search} type="text" placeholder="Search by name, email, or phone..."
                                                class="w-full rounded-md px-12 py-3 text-medium bg-white border border-gray-300  placeholder-[rgb(209,213,219)] focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </main >

                    <div className={`${is_loading ? "hidden" : "block"} bg-white flex flex-col shadow-md rounded-lg p-4 mt-2 max-w-[1350px] mx-auto`}>
                        <h1 className={`${bookings_object.length == 0 ? "block" : "hidden"} text-center text-xl`}>There is no bookings right now</h1>
                        {bookings_object.filter(booking =>


                        (
                            (booking.booking_status === room_status && booking.room_name === room_name_filter &&
                                (booking.gmail.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.user_name.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.phone.toLowerCase().includes(room_search.toLowerCase())
                                )
                            ) || //created the search room functionality , room status and room_name filters

                            (booking.booking_status === room_status && room_name_filter === "All Rooms" &&
                                (booking.gmail.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.user_name.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.phone.toLowerCase().includes(room_search.toLowerCase())
                                )
                            ) || //

                            (room_status === "All Status" && booking.room_name === room_name_filter &&
                                (booking.gmail.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.user_name.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.phone.toLowerCase().includes(room_search.toLowerCase())
                                )
                            ) ||

                            (room_status === "All Status" && room_name_filter === "All Rooms" &&
                                (booking.gmail.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.user_name.toLowerCase().includes(room_search.toLowerCase()) ||
                                    booking.phone.toLowerCase().includes(room_search.toLowerCase())
                                )
                            ) ||

                            (room_status === "All Status" && room_name_filter === "All Rooms" && room_search === '')
                        )
                        ).map((bookings) => {
                            const due = bookings.total_price - bookings.paid
                            const payload = {
                                id: bookings.id,
                            };

                            return (
                                <>
                                    <article key={bookings.id} class=" flex exsm:px-0 px-4 py-4 justify-between items-start exsm:gap-0 gap-4  border-b border-[#e5e7eb] hover:border-gray-200">

                                        <div className="flex gap-4">
                                            <img src={bookings.room_picture} alt="thumbnail" class="w-14 h-14 rounded-md object-cover flex-shrink-0" />
                                            <div class="flex-1">
                                                <div class="flex items-center justify-between gap-4">
                                                    <div class="min-w-0">
                                                        <a class="text-[rgb(79,70,229)] text-sm font-[500] block">{bookings.booking_id} - {bookings.guest_name}</a>
                                                        <div className="text-gray-500 text-sm font-[400] mt-1">
                                                            {bookings.room_name}
                                                            {" • "}
                                                            {`${new Date(bookings.check_in_date).getFullYear()}-${new Date(bookings.check_in_date).getMonth() + 1}-${new Date(bookings.check_in_date).getDate()}`}
                                                            {" to "}
                                                            {`${new Date(bookings.check_out_date).getFullYear()}-${new Date(bookings.check_out_date).getMonth() + 1}-${new Date(bookings.check_out_date).getDate()}`}
                                                        </div>
                                                    </div>


                                                </div>



                                                <div class="flex smd:flex-col gap-1 mt-1 text-xs text-gray-400">
                                                    <div class="flex items-center gap-2">
                                                        <span class="text-[rgb(156,163,175)] text-[12px] font-[400]">{bookings.gmail}</span>
                                                    </div>

                                                    <div class="flex items-center">
                                                        <span> {" • "} {bookings.phone}</span>
                                                    </div>
                                                </div>




                                            </div>
                                        </div>



                                        <div class="flex items-center gap-3 ml-2">
                                            <div className="flex flex-col items-end">
                                                <span class="text-sm font-medium">${bookings.total_amount}</span>
                                                <div class="text-right flex gap-1">
                                                    <div class="inline-flex items-center gap-1 bg-white rounded font-[400] py-1 text-[12px] text-gray-600 ">
                                                        {"Paid: $"}
                                                        {bookings.paid}
                                                        {" | Due: $"}
                                                        {bookings.total_amount - bookings.paid}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 ">
                                                <div className="flex smd:flex-col items-center gap-3">
                                                    {/* if the booking status is confirmed then the confirmed button will be shown */}
                                                    <button
                                                        class={`${bookings.booking_status === "Confirmed" ? "inline-flex" : "hidden"} items-center gap-2 px-3 py-1 rounded-full bg-${bookings.booking_status === "Confirmed" ? "emerald-100" : ""} text-${bookings.booking_status === "Confirmed" ? "black" : ""} font-medium text-[12px] shadow-sm hover:opacity-95`}
                                                        aria-pressed="true"
                                                    >

                                                        {bookings.booking_status === "Confirmed" ? "Confirmed" : ""}
                                                    </button>
                                                    {/* if the booking status is cancelled then the cancelled button will be shown */}
                                                    <button
                                                        class={`${bookings.booking_status === "Cancelled" ? "inline-flex" : "hidden"} items-center gap-2 px-3 py-1 rounded-full ${bookings.booking_status === "Cancelled" ? "bg-red-600" : ""} text-${bookings.booking_status === "Cancelled" ? "white" : ""} font-medium text-[12px] shadow-sm hover:opacity-95`}
                                                        aria-pressed="true"
                                                    >

                                                        {bookings.booking_status === "Cancelled" ? "Cancelled" : ""}
                                                    </button>
                                                    {/* if the booking status is pending then the pending button will be shown */}
                                                    <button
                                                        class={`${bookings.booking_status === "Pending" ? "inline-flex" : "hidden"} items-center gap-2 px-3 py-1 rounded-full ${bookings.booking_status === "Pending" ? "bg-black" : ""} text-${bookings.booking_status === "Pending" ? "white" : ""} font-medium text-sm shadow-[12px] hover:opacity-95`}
                                                        aria-pressed="true"
                                                    >

                                                        {bookings.booking_status === "Pending" ? "Pending" : ""}
                                                    </button>
                                                    <button aria-label="view" class="w-10 h-10 rounded-full bg-[#4f46e5] flex items-center justify-center shadow-md">
                                                        <Link to="/Booking_Details" state={{ room: payload }}>
                                                            <Eye className="cursor-pointer" color="white" />
                                                        </Link>
                                                    </button>
                                                </div>
                                            </div >
                                        </div>

                                    </article>
                                </>
                            )
                        })}

                    </div >

                    <div className="bg-white shadow-md rounded-lg p-4 max-w-[1350px] mx-auto">



                        <div className={`${is_loading ? "flex" : "hidden"} items-start gap-4 p-4 animate-pulse`}>

                            <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0"></div>


                            <div className="flex-1 space-y-2">

                                <div className="h-5 w-3/5 bg-gray-200 rounded"></div>


                                <div className="h-4 w-32 bg-gray-200 rounded"></div>


                                <div className="h-3 w-2/5 bg-gray-200 rounded"></div>


                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                </div>
                            </div>


                            <div className="flex flex-col items-end gap-3">

                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                </div>


                                <div className="h-8 w-14 bg-gray-200 rounded-md"></div>
                            </div>
                        </div>

                        <div className={`${is_loading ? "flex" : "hidden"} items-start gap-4 p-4 animate-pulse`}>

                            <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0"></div>


                            <div className="flex-1 space-y-2">

                                <div className="h-5 w-3/5 bg-gray-200 rounded"></div>


                                <div className="h-4 w-32 bg-gray-200 rounded"></div>


                                <div className="h-3 w-2/5 bg-gray-200 rounded"></div>


                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                </div>
                            </div>


                            <div className="flex flex-col items-end gap-3">

                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                </div>


                                <div className="h-8 w-14 bg-gray-200 rounded-md"></div>
                            </div>
                        </div>

                        <div className={`${is_loading ? "flex" : "hidden"} items-start gap-4 p-4 animate-pulse`}>

                            <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0"></div>


                            <div className="flex-1 space-y-2">

                                <div className="h-5 w-3/5 bg-gray-200 rounded"></div>


                                <div className="h-4 w-32 bg-gray-200 rounded"></div>


                                <div className="h-3 w-2/5 bg-gray-200 rounded"></div>


                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                </div>
                            </div>


                            <div className="flex flex-col items-end gap-3">

                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                </div>


                                <div className="h-8 w-14 bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </main>


                <main className={`calender  ${booking_show == "Calender" ? "block" : "hidden"}`}>
                    <div className="smds:w-40p mx-auto mt-10">
                        <label for="room" class="block text-sm font-medium text-gray-600 mb-2">Room</label>
                        <select id="room" name="room" onChange={(e) => set_selected_room_name(e.target.value)} class="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">

                            {rooms.map((rooms) => {
                                return (<>
                                    <option>{rooms.room_name}</option>
                                </>)
                            })}
                        </select>
                    </div>




                    <div className="calende w-[80%] mx-auto">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            height="auto"
                            events={events}
                        />
                    </div>
                </main>



            </section >


            <Footer />
        </>
    )
}

export default Bookings



