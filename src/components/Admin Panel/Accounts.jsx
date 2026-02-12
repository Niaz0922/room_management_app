import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import { ArrowDown } from 'lucide-react';
import { Building } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import room_one from "../../assets/room_1.jpeg"
import room_two from "../../assets/room_two.jpeg"
import { useEffect, useState, useRef } from "react";
import { getWeek } from 'date-fns';
import api from "../API/api";

function Accounts() {

    useEffect(() => {
        // Guard prevents the second Strict Mode run
        document.querySelectorAll(".payment_list_room").forEach((e) => {
            let total_amount = 0;
            e.querySelectorAll("#payment_amount").forEach((payment) => {
                total_amount += Number(payment.innerHTML.replace("$", ""))
            })
            // e.querySelector(".payment_room_total").innerHTML = "$"+total_amount
            e.querySelector(".payment_room_total").innerHTML = "$" + total_amount
        });
    });



    useEffect(() => {
        let total_amount = 0
        document.querySelectorAll(".payment_list .payment_room_total").forEach((e) => {
            total_amount += Number(e.innerHTML.replace("$", ""))
        })
        document.querySelector(".total_amount").innerHTML = "$" + total_amount

    })


    //rooms list

    const [rooms, set_rooms_object] = useState([])
    const [payments, set_payments_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        set_is_loading(true)
        get_all_rooms()
        get_all_payemnts()
    }, [])

    const get_all_rooms = async () => {
        set_is_loading(true)
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

    const get_all_payemnts = async () => {
        set_is_loading(true)
        try {
            const response = await api.get("/get_all_payment")
            const payments = response.data.payments
            set_payments_object(payments)
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






    const [filter_group_by, set_filter_group_by] = useState("Group By Room");
    const [filter_by_room, set_filter_by_room] = useState("All Rooms");
    const [filter_by_time, set_filter_by_time] = useState("All Time");




    function Handle_group_by_filter(event) {
        set_filter_group_by(event.target.value)
    }

    function Handle_filter_By_room(event) {
        set_filter_by_room(event.target.value)

    }

    function Handle_by_time(event) {
        const date = new Date(); // Or any other Date object
        const monthName = date.toLocaleString('default', { month: 'short' });


        const val = String(event.target.value).trim();
        switch (val) {
            case "All time":
            case "All Time":
                set_filter_by_time("All Time");
                break;

            case "Today":
                set_filter_by_time(date.getDate());
                break;

            case "This Week":
                // probably you intended the week-of-month; original Math.ceil(date % 7) is invalid
                set_filter_by_time(Math.ceil(date.getDate() / 7));
                break;

            case "This Month":
                set_filter_by_time(monthName);
                break;

            case "This Year":
                set_filter_by_time(date.getFullYear());
                break;

            default:
                // fallback: keep original value or handle custom options
                set_filter_by_time(val);
        }

    }




    return (
        <>
            <Navbar />
            <AdminNavbar />
            <Sidebar_navbar />
            <section className={`${is_loading ? "hidden" : "block"} w-[calc(100%-436px)] ml-auto pt-10 pr-[13rem] h-screen overflow-y-scroll  
                max-[1019px]:w-full 
                max-[1019px]:px-10 
                max-[619px]:px-2 
                max-[1019px]:ml-0 
                max-[1588px]:w-[calc(100%-300px)] 
                max-[1588px]:pr-[2rem] 
                max-[1212px]:pr-[0.8rem] 
                max-[1212px]:w-[calc(100%-280px)]
            `}>
                <div className="Transactions_filter_Section flex 
                    max-[619px]:flex-col 
                    max-[619px]:gap-4 max-[619px]:items-start 
                    max-[619px]:pl-4 justify-between items-center mb-6 mx-auto
                ">
                    <div>
                        <h2 className="text-[20px] font-[700] text-[rgb(31,41,55)] font-inter-sans">Financial Transactions</h2>
                        <p className="text-[rgb(107,114,128)] text-sm font-[400]">View and manage all payment transactions</p>
                    </div>

                    <div className="flex gap-2 
                        max-[1070px]:flex-wrap  
                        max-[619px]:flex-col  
                        max-[1019px]:flex-nowrap
                    ">
                        <div className="relative">
                            <select
                                onChange={Handle_by_time}
                                className="appearance-none w-40 max-[619px]:w-45 rounded-md border border-gray-300 px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                aria-label="All time"
                            >
                                <option>All Time</option>
                                <option>Today</option>
                                <option>This Month</option>
                                <option>This Year</option>
                            </select>

                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <ArrowDown color="#9ca3af" className="w-5 h-5" />
                            </span>
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none w-45 rounded-md border border-gray-300 px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                aria-label="All time" onChange={Handle_filter_By_room}
                            >
                                <option>All Rooms</option>
                                {rooms.map((room) => {
                                    return (
                                        <option>{room.room_name}</option>
                                    )
                                })}

                            </select>

                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <ArrowDown color="#9ca3af" className="w-5 h-5" />
                            </span>
                        </div>
                        <div className="relative">
                            <select
                                className="appearance-none w-45 rounded-md border border-gray-300 px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                                aria-label="All time" onChange={Handle_group_by_filter}
                            >
                                <option>Group By Room</option>
                                <option>Show All</option>

                            </select>

                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <ArrowDown color="#9ca3af" className="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="total_transection flex justify-between items-center mx-auto mb-4 bg-white rounded-lg p-6  border-b-[0.7px] border-[#e1e2e3]">
                    <div>
                        <h2 className="text-[18px] font-[700] text-[rgb(31,41,55)] font-inter-sans">Total Collection</h2>
                        <p className="text-[rgb(107,114,128)] text-sm font-[400]">All time</p>
                    </div>
                    <div>
                        <h2 className="total_amount text-[24px] font-[700] text-[rgb(79,70,229)] font-inter-sans"></h2>
                    </div>
                </div>

                <main className="payment_list ">
                    {
                        rooms.filter(room =>
                            filter_by_room === "All Rooms" || room.room_name === filter_by_room
                        ).map((room) => {


                            return (

                                <div id={room.id} className="payment_list_room">
                                    <div className={`${filter_group_by === "Group By Room" ? "flex" : "hidden"}  justify-between items-center p-6 border-b-[0.7px] border-[#e1e2e3]`}>
                                        <div className="flex gap-2 items-center">
                                            <Building color="rgb(198,202,209)" className="w-5 h-5" />
                                            <h2>{room.room_name}</h2>
                                        </div>
                                        <h2 className="payment_room_total text-[18px] font-[700] text-[rgb(79,70,229)] font-inter-sans">${ }</h2>
                                    </div>
                                    {
                                        payments
                                            .filter(
                                                payment =>
                                                    (payment.room_name === room.room_name && payment.payment_date.split(" ")[0] === filter_by_time) ||
                                                    (payment.room_name === room.room_name && Number(payment.payment_date.split(" ")[1]) === filter_by_time) ||
                                                    (payment.room_name === room.room_name && Number(payment.payment_date.split(" ")[2]) === filter_by_time) ||
                                                    (payment.room_name === room.room_name && filter_by_time === "All Time")
                                            )
                                        

                                            .map(payment => {

                                                
                                                return (
                                                    <div id={payment.id} className="payment_list p-6 border-b-[0.7px] border-[#e1e2e3] flex justify-between items-start">
                                                        <div className="left">
                                                            <div className=" flex gap-4 mb-2">
                                                                <div className="credit_card h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                    <CreditCard color="#4f46e5" className="w-[1.25rem] h-[1.25rem] align-middle" />
                                                                </div>

                                                                <div >
                                                                    <p className="text-[14px] font-[400] font-inter-sans">Payment from {payment.payment_from}</p>
                                                                    <p className="text-sm font-[400] text-[rgb(107,114,128)] flex gap-1">Booking {payment.booking_id}  <span className={`${filter_group_by === "Group By Room" ? "hidden" : "block"}`}>  - {payment.booking_room_name}</span></p>
                                                                </div>
                                                            </div>
                                                            <div className={`${payment.payment_method === "Bank" ? "inline-flex" : "hidden"} Bank_transfer bg-[#f3e8ff] rounded-full`}>
                                                                <span className="text-[rgb(107,33,168)] text-[12px] font-[400] px-2 py-1">Bank_transfer</span>
                                                            </div>
                                                            <div className={`${payment.payment_method === "Cash" ? "inline-flex" : "hidden"} Bank_transfer bg-[#dcfce7] rounded-full`}>
                                                                <span className="text-[rgb(22,101,52)] text-[12px] font-[400] px-2 py-1">Cash</span>
                                                            </div>

                                                        </div>

                                                        <div className="right flex gap-6">
                                                            <p className="text-[rgb(107,114,128)] font-[400] text-[14px]">{payment.payment_date}</p>
                                                            <p id="payment_amount" className="text-[rgb(17,24,39)] text-[14px] font-[600]">${payment.payment_amount}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    }




                                </div>



                            )

                        })}






                </main>
            </section>

            <section className={`${is_loading ? "block" : "hidden"} w-[calc(100%-436px)] ml-auto pt-10 pr-[13rem] h-screen overflow-y-scroll  
                max-[1019px]:w-full 
                max-[1019px]:px-10 
                max-[619px]:px-2 
                max-[1019px]:ml-0 
                max-[1588px]:w-[calc(100%-300px)] 
                max-[1588px]:pr-[2rem] 
                max-[1212px]:pr-[0.8rem] 
                max-[1212px]:w-[calc(100%-280px)]`}>

                <header class="flex items-start justify-between mb-6">
                    <div>
                        <div class="h-6 w-64 rounded bg-gray-200 animate-pulse"></div>
                        <div class="mt-2 h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
                    </div>


                    <div class="flex gap-3 items-center">
                        <div class="h-10 w-28 rounded-full bg-gray-200 animate-pulse"></div>
                        <div class="h-10 w-28 rounded-full bg-gray-200 animate-pulse"></div>
                        <div class="h-10 w-36 rounded-full bg-gray-200 animate-pulse"></div>
                    </div>
                </header>


                <section class="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="h-4 w-44 rounded bg-gray-200 animate-pulse mb-3"></div>
                            <div class="h-8 w-56 rounded bg-gray-200 animate-pulse"></div>
                        </div>
                        <div class="ml-6">

                            <div class="h-10 w-28 rounded bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
                </section>


                <div class="mb-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="h-12 w-12 rounded-md bg-gray-200 animate-pulse"></div>
                            <div>
                                <div class="h-5 w-36 rounded bg-gray-200 animate-pulse"></div>
                                <div class="mt-2 h-3 w-28 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                        <div class="h-8 w-20 rounded bg-gray-200 animate-pulse"></div>
                    </div>
                </div>


                <ul class="space-y-4">

                    <li class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-start gap-4">

                                <div class="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>


                                <div class="flex flex-col">
                                    <div class="h-4 w-40 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-2 h-3 w-28 rounded bg-gray-200 animate-pulse"></div>

                                    <div class="mt-3 flex items-center gap-2">
                                        <div class="h-6 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                        <div class="h-6 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>


                            <div class="flex flex-col items-end">
                                <div class="h-3 w-24 rounded bg-gray-200 animate-pulse"></div>
                                <div class="mt-3 h-6 w-20 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                    </li>



                    <li class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-start gap-4">
                                <div class="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                <div class="flex flex-col">
                                    <div class="h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-2 h-3 w-32 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-3 flex items-center gap-2">
                                        <div class="h-6 w-14 rounded-full bg-gray-200 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col items-end">
                                <div class="h-3 w-20 rounded bg-gray-200 animate-pulse"></div>
                                <div class="mt-3 h-6 w-24 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                    </li>

                    <li class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-start gap-4">
                                <div class="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                <div class="flex flex-col">
                                    <div class="h-4 w-40 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-2 h-3 w-24 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-3 flex items-center gap-2">
                                        <div class="h-6 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col items-end">
                                <div class="h-3 w-28 rounded bg-gray-200 animate-pulse"></div>
                                <div class="mt-3 h-6 w-20 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                    </li>

                    <li class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div class="flex items-center justify-between">
                            <div class="flex items-start gap-4">
                                <div class="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                <div class="flex flex-col">
                                    <div class="h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-2 h-3 w-36 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="mt-3 flex items-center gap-2">
                                        <div class="h-6 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                        <div class="h-6 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col items-end">
                                <div class="h-3 w-24 rounded bg-gray-200 animate-pulse"></div>
                                <div class="mt-3 h-6 w-28 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>
                    </li>

                </ul>
            </section>
            <Footer />
        </>
    )
}

export default Accounts