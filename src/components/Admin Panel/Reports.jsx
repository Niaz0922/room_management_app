import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import { DockIcon, Download } from 'lucide-react';
import { Search } from 'lucide-react';
import "../../App.css"
import { File } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router'
import room_one from "../../assets/room_1.jpeg"
import room_two from "../../assets/room_two.jpeg"
import { useEffect, useRef, useState } from "react";
import api from "../API/api";
import exportToExcel from './Export_Excel';


function Reports() {





    const [tbody_count, set_tbody_count] = useState();
    const [total_paid_amount, set_total_paid_amount] = useState();
    const [total_due_amount, set_total_due_amount] = useState();
    const [total_revenue_amount, set_total_revenue_amount] = useState();

    useEffect(() => {
        // This code will run after *every* render of MyComponent
        set_tbody_count(document.querySelector("tbody").childElementCount);
        // Perform your desired task here
    }); // No dependency array means it runs after every render 


    //calculating the total paid amount-------------------------------------->

    useEffect(() => {
        var total = 0;
        document.querySelectorAll("tbody .paid").forEach((e) => {

            total += Number(e.innerHTML.replace("$", ""))

        })
        set_total_paid_amount(total)
    }, [tbody_count])

    //calculating the total paid amount-------------------------------------->

    useEffect(() => {
        var total = 0;
        document.querySelectorAll("tbody .due").forEach((e) => {

            total += Number(e.innerHTML.replace("$", ""))

        })
        set_total_due_amount(total)
    }, [tbody_count])

    //calculating the total revenue amount-------------------------------------->

    useEffect(() => {
        var total = 0;
        document.querySelectorAll("tbody .revenue").forEach((e) => {

            total += Number(e.innerHTML.replace("$", ""))

        })
        set_total_revenue_amount(total)
    }, [tbody_count])


    const [payments_object, set_payments_object] = useState([])
    const [rooms_object, set_rooms_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        set_is_loading(true)
        get_all_rooms()
        get_all_payemnts()
    }, [])

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






    const stats = [
        { id: 1, title: 'Total Records', value: tbody_count, color: 'bg-[#3b82f6]', icon: File, link_adress: "/File" },
        { id: 2, title: 'Total Revenue', value: "$" + total_revenue_amount, color: 'bg-[#22c55e]', icon: Calendar, link_adress: "/Calendar" },
        { id: 3, title: 'Amount Paid', value: "$" + total_paid_amount, color: 'bg-[#6366f1]', icon: Download, link_adress: "/Download" },
        { id: 3, title: 'Amount Due', value: "$" + total_due_amount, color: 'bg-[#ef4444]', icon: Eye, link_adress: "/Eye" }
    ]









    const [date, set_date] = useState("All Time");
    const [is_custom_range_date, set_is_custom_range_date] = useState(false);
    const [start_custom_range_date, set_start_custom_range_date] = useState("");
    const [end_custom_range_date, set_end_custom_range_date] = useState("");
    const [room, set_room] = useState("All Rooms");
    const [search, set_search] = useState("");






    const searchTerm = (search || "").toString().trim().toLowerCase();
    function Handle_Filter_date(e) {
        const date = new Date(); // Or any other Date object
        const monthName = date.toLocaleString('default', { month: 'short' });


        const val = String(e.target.value).trim();
        switch (val) {
            case "All time":
            case "All Time":
                set_date("All Time");
                set_is_custom_range_date(false)
                break;

            case "Today":
                set_date(date.getDate());
                set_is_custom_range_date(false)
                break;

            case "Last 7 days":
                // probably you intended the week-of-month; original Math.ceil(date % 7) is invalid
                const today = new Date();

                // Subtract 7 days
                const sevenDaysBefore = new Date();
                sevenDaysBefore.setDate(today.getDate() - 7);

                // Format as YYYY-MM-DD
                const formattedDate = sevenDaysBefore.toISOString().split('T')[0];
                set_date(formattedDate);
                set_is_custom_range_date(false)
                break;

            case "Last 30 days":
                // probably you intended the week-of-month; original Math.ceil(date % 7) is invalid


                // Subtract 7 days
                const thirty_days_before = new Date();
                thirty_days_before.setDate(new Date().getDate() - 30);

                // Format as YYYY-MM-DD
                const thirty_days_before_format = thirty_days_before.toISOString().split('T')[0];
                set_date(thirty_days_before_format);
                set_is_custom_range_date(false)
                break;

            case "Last Year":
                set_date(date.getFullYear());
                set_is_custom_range_date(false)
                break;

            case "Custom Range":
                set_is_custom_range_date(true)
                break;

            default:
                // fallback: keep original value or handle custom options
                set_date(val);
                set_is_custom_range_date(false)
        }
    }





    function Handle_Filter_room(e) {
        set_room(e.target.value)
    }


    function Handle_Filter_search(e) {
        set_search(e.target.value)
    }

    //Custom range start date----------------------->

    function Handle_Start_date(e) {
        set_start_custom_range_date(e.target.value)
    }

    //Custom range end date------------------------->

    function Handle_End_date(e) {
        set_end_custom_range_date(e.target.value)
    }




    const handleExport = () => {
        exportToExcel(payments_object , "ReportFile");
    };


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

                <div className="report_Section flex 
                    max-[619px]:flex-col 
                    max-[619px]:gap-4 max-[619px]:items-start 
                    max-[619px]:pl-4 justify-between items-center mb-6 mx-auto
                ">
                    <div>
                        <h2 className="text-[20px] font-[700] text-[rgb(31,41,55)] font-inter-sans">Guest Reports</h2>
                        <p className="text-[rgb(107,114,128)] text-sm font-[400]">Comprehensive booking and payment reports</p>
                    </div>

                    <button onClick={handleExport} className="flex justify-center items-center gap-2 cursor-pointer font-[500] font-inter-sans text-[.875rem] bg-[rgb(22,163,74)] text-white py-[0.5rem] px-[1rem] rounded-[0.375rem] border-[1px] border-transparent">
                        <Download color="white" className="w-[1rem] h-[1rem]" />
                        Export To Excel
                    </button>

                </div>

                <div className="p-6 border-b-[0.7px] border-[#e1e2e3] rounded-lg">
                    <h2 className="text-[18px] font-[400] text-[rgb(17,24,39)] pb-4">Filters</h2>
                    <form className="flex gap-[1rem] smds:flex-row flex-col">

                        <div className="w-[100%]">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-2">Date Range</label>
                            <select id="status" name="status" onChange={Handle_Filter_date} className="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                <option>All Time</option>
                                <option>Today</option>
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last Year</option>
                                <option>Custom Range</option>
                            </select>
                        </div>
                        <div className="w-[100%] ">
                            <label htmlFor="room" className="block text-sm font-medium text-gray-600 mb-2">Room</label>
                            <select id="room" name="room" onChange={Handle_Filter_room} className="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                <option>All Rooms</option>
                                {rooms_object.map((rooms) => {
                                    return (<>
                                        <option key={rooms.id}>{rooms.room_name}</option>
                                    </>)
                                })}


                            </select>
                        </div>
                        <div className="w-[100%]">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-2">Search</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Search color="rgb(163,169,179)" />
                                </span>


                                <input id="search" name="search" type="text" onChange={Handle_Filter_search} placeholder="Search guests"
                                    className="w-full rounded-md px-12 py-3 text-medium bg-white border border-gray-300  placeholder-[rgb(209,213,219)] focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                            </div>
                        </div>
                    </form>

                    <div className={`custom_range ${is_custom_range_date ? "flex" : "hidden"}  smds:flex-row flex-col mt-4 gap-[1rem]`}>
                        <div className="w-[100%]">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
                            <input type="date" onChange={Handle_Start_date} className="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400" />
                        </div>
                        <div className="w-[100%] ">
                            <label htmlFor="room" className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
                            <input type="date" onChange={Handle_End_date} className="w-full rounded-md border border-gray-300 px-4 py-3 text-medium bg-white placeholder-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 items-center justify-center">
                        {stats.map((s) => (
                            <>
                                <div key={s.id} className="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
                                    <div className="flex items-start gap-4">
                                        <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}>
                                            <s.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-500">{s.title}</p>
                                            <p className="text-2xl font-semibold text-slate-900 mt-1">{s.value}</p>
                                        </div>
                                    </div>

                                </div>

                            </>
                        ))}
                    </div>
                </div>

                <div className=" mt-6 mb-3">
                    <h2 className="text-[18px] text-[rgb(17,24,39)] font-[400] pl-6 pb-6">Guest Report ({tbody_count} records)</h2>
                    <div className=" relative overflow-x-scroll">
                        <table id="Table_element" className="min-w-full divide-y text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-[rgb(255,255,255)] font-inter-sans uppercase bg-[#22c55e] ">
                                <tr>
                                    <th scope="col" className="px-6 py-3  font-[500] text-left tracking-wider">
                                        Booking ID
                                    </th>
                                    <th scope="col" className="px-6 py-5 font-[500] text-left tracking-wider">
                                        Guest Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Room Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Booking Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Check-in Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Check-out Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Paid
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Payment Method
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Payment Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-[500] text-left tracking-wider">
                                        Due
                                    </th>


                                </tr>
                            </thead>
                            <tbody id="tbody_element" className="w-full">

                                {


                                    payments_object.filter(payment => {

                                        // safe short names
                                        const bookingDate = payment?.payment_date.split(" "); // could be array or string depending on your structure
                                        const formattedDate = `${new Date(payment.payment_date).getFullYear()}/${new Date(payment.payment_date).toLocaleString("default", { month: 'short' })}/${new Date(payment.payment_date).getDate()}`;




                                        const roomName = (payment?.room_name || "").toString();
                                        const bookingId = (payment?.booking_id || "").toString();
                                        const guestName = (payment?.user_name || "").toString();
                                        const email = (payment?.gmail || "").toString();





                                        // safe lowercase variants for search comparisons
                                        const roomLower = roomName.toLowerCase();
                                        const bookingIdLower = bookingId.toLowerCase();
                                        const guestLower = guestName.toLowerCase();
                                        const emailLower = email.toLowerCase();

                                        // search match (any of the text fields)
                                        const matchesSearch =
                                            searchTerm === "" ||
                                            roomLower.includes(searchTerm) ||
                                            bookingIdLower.includes(searchTerm) ||
                                            guestLower.includes(searchTerm) ||
                                            emailLower.includes(searchTerm);


                                        // date matching — adapt depending on what bookingDate actually is.
                                        // Example assumes bookingDate is an array where:
                                        // bookingDate[0] is a specific date, bookingDate[1] maybe "All Time" or something.
                                        // Adjust these checks to match your real data structure.
                                        const matchesDate =

                                            date === "All Time" ||
                                            (
                                                String(bookingDate[0]) === String(date) ||
                                                String(bookingDate[1]) === String(date) ||
                                                String(bookingDate[2]) === String(date) ||
                                                (formattedDate >= date) ||
                                                (formattedDate >= date)
                                            )
                                            ||
                                            String(bookingDate) === String(date);


                                        const formattedDateObj = new Date(formattedDate); // your current date
                                        const startDateObj = new Date(start_custom_range_date);
                                        const endDateObj = new Date(end_custom_range_date);

                                        var custom_range = is_custom_range_date === true ? formattedDateObj >= startDateObj && formattedDateObj <= endDateObj : true;


                                        // room matching
                                        const matchesRoom = (room === "All Rooms" || roomName === room)

                                        // final combination
                                        // You had many OR branches previously. Here we follow the general intent:
                                        return matchesSearch && matchesDate && matchesRoom && custom_range;



                                    }).map((payments) => {

                                        return (
                                            <tr key={payments.id} className="bg-white border-b border-gray-200">
                                                <td className="whitespace-nowrap py-3 text-[rgb(79,70,229)] text-[14px] px-[1.5rem] font-[400] font-inter-sans">
                                                    {payments.booking_id}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem] text-[rgb(17,24,39)] text-[14px] font-[400] py-3">
                                                    {payments.user_name}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem] text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {payments.gmail}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem]-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {payments.phone}
                                                </td>
                                                <td className="whitespace-nowrap  text-[rgb(107,114,128)] text-[14px] font-[400] px-6 py-3 ">
                                                    {payments.room_name}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem] text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {payments.payment_date}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem] text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {`${new Date(payments.check_in_date).getFullYear()}/${new Date(payments.check_in_date).getMonth() + 1}/${new Date(payments.check_in_date).getDate()}`}
                                                </td>
                                                <td className="whitespace-nowrap px-[1.5rem] text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {`${new Date(payments.check_out_date).getFullYear()}/${new Date(payments.check_out_date).getMonth() + 1}/${new Date(payments.check_out_date).getDate()}`}
                                                </td>
                                                <td className="revenue whitespace-nowrap px-[1.5rem] py-3  text-[rgb(107,114,128)] text-[14px] font-[400]">
                                                    {payments.total_amount}
                                                </td>
                                                <td className="paid whitespace-nowrap px-6 py-3  text-[rgb(107,114,128)] text-[14px] font-[400] ">
                                                    {payments.paid}
                                                </td>
                                                <td className="whitespace-nowrap px-6 text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {payments.payment_method}
                                                </td>
                                                <td className="whitespace-nowrap px-6 text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {payments.payment_date}
                                                </td>
                                                <td className="due whitespace-nowrap px-6 text-[rgb(107,114,128)] text-[14px] font-[400] py-3">
                                                    {Number(payments.total_amount) - Number(payments.paid)}
                                                </td>


                                            </tr>
                                        )

                                    })}

                            </tbody>
                        </table>
                    </div>
                </div>
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
                <div class="max-w-6xl mx-auto p-6">


                    <div class="flex items-start justify-between mb-6">
                        <div>
                            <div class="h-8 w-64 rounded-md bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            <div class="mt-2 h-4 w-48 rounded-md bg-gray-200 animate-pulse"></div>
                        </div>


                        <div class="h-10 w-36 rounded-md bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                    </div>


                    <div class="bg-white rounded-lg p-5 shadow-sm mb-6">
                        <h3 class="text-lg font-medium mb-4">
                            <span class="inline-block h-5 w-40 bg-gray-200 rounded animate-pulse"></span>
                        </h3>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div class="space-y-2">
                                <div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div class="h-10 rounded-md bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>


                            <div class="space-y-2">
                                <div class="h-3 w-14 bg-gray-200 rounded animate-pulse"></div>
                                <div class="h-10 rounded-md bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>


                            <div class="space-y-2">
                                <div class="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                                <div class="h-10 rounded-md bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>
                        </div>
                    </div>


                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                        <div class="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-lg bg-gray-200 animate-pulse"></div>
                            <div class="flex-1">
                                <div class="h-3 w-28 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div class="h-6 w-20 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-lg bg-gray-200 animate-pulse"></div>
                            <div class="flex-1">
                                <div class="h-3 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div class="h-6 w-24 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-lg bg-gray-200 animate-pulse"></div>
                            <div class="flex-1">
                                <div class="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div class="h-6 w-20 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4">
                            <div class="h-12 w-12 rounded-lg bg-gray-200 animate-pulse"></div>
                            <div class="flex-1">
                                <div class="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div class="h-6 w-24 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                            </div>
                        </div>
                    </div>


                    <div class="bg-white rounded-lg shadow-sm overflow-hidden">

                        <div class="px-6 py-4 bg-gray-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="h-6 w-44 rounded bg-gray-200 animate-pulse"></div>
                                    <div class="h-4 w-36 rounded bg-gray-200 animate-pulse"></div>
                                </div>
                                <div class="h-8 w-20 rounded bg-gray-200 animate-pulse"></div>
                            </div>
                        </div>


                        <div class="px-4 py-3 border-b border-gray-100">
                            <div class="grid grid-cols-12 gap-4 text-xs text-gray-500">
                                <div class="col-span-2"><div class="h-3 w-24 bg-gray-100 rounded animate-pulse"></div></div>
                                <div class="col-span-2"><div class="h-3 w-28 bg-gray-100 rounded animate-pulse"></div></div>
                                <div class="col-span-3"><div class="h-3 w-32 bg-gray-100 rounded animate-pulse"></div></div>
                                <div class="col-span-2"><div class="h-3 w-20 bg-gray-100 rounded animate-pulse"></div></div>
                                <div class="col-span-3"><div class="h-3 w-20 bg-gray-100 rounded animate-pulse"></div></div>
                            </div>
                        </div>


                        <div class="max-h-80 overflow-auto">
                            <div class="divide-y divide-gray-100">


                                <div class="px-4 py-4">
                                    <div class="grid grid-cols-12 gap-4 items-center">
                                        <div class="col-span-2">
                                            <div class="h-4 w-28 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-56 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-32 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>


                                <div class="px-4 py-4">
                                    <div class="grid grid-cols-12 gap-4 items-center">
                                        <div class="col-span-2">
                                            <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-40 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-36 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>


                                <div class="px-4 py-4">
                                    <div class="grid grid-cols-12 gap-4 items-center">
                                        <div class="col-span-2">
                                            <div class="h-4 w-28 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-56 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                        <div class="col-span-2">
                                            <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div class="col-span-3">
                                            <div class="h-4 w-32 bg-gray-200 rounded animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default Reports