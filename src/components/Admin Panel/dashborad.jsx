import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import { Building, User } from 'lucide-react';
import { House } from 'lucide-react';
import { Users } from 'lucide-react';

import { Calendar } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { File } from 'lucide-react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link } from 'react-router'
import api from "../API/api";



function Dashboard() {









    const [rooms, set_rooms_object] = useState([])
    const [payments, set_payments_object] = useState([])
    const [bookings, set_bookings_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)


    useEffect(() => {
        set_is_loading(true)
        get_all_bookings()
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






    return (
        <>
            <Navbar />
            <AdminNavbar />

            <Sidebar_navbar />
            <section id="dashboard_section" className={`${is_loading ? "hidden" : "block"} w-full ml-auto h-screen overflow-y-scroll`}>
                <div className="min-h-screen bg-slate-50 p-6">
                    <div className="max-w-[1200px] mx-auto">
                        {/* Top stat cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                            <div className="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
                                <div className="flex items-start gap-4  pb-6">
                                    <div className={`bg-[#6366f1] w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}>
                                        <Building className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Total Rooms</p>
                                        <p className="text-2xl font-semibold text-slate-900 mt-1">{rooms.length}</p>
                                    </div>
                                </div>
                                <Link to={`/Rooms`}>
                                    <a className="absolute left-6 bottom-4 text-sm text-indigo-600 hover:underline">Manage Rooms</a>
                                </Link>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
                                <div className="flex items-start gap-4  pb-6">
                                    <div className={`bg-[#22c55e] w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}>
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Total  Bookings</p>
                                        <p className="text-2xl font-semibold text-slate-900 mt-1">{bookings.length}</p>
                                    </div>
                                </div>
                                <Link to={`/Bookings`}>
                                    <a className="absolute left-6 bottom-4 text-sm text-indigo-600 hover:underline">Manage Bookings</a>
                                </Link>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
                                <div className="flex items-start gap-4  pb-6">
                                    <div className={`bg-[#3b82f6] w-12 h-12 rounded-lg flex items-center justify-center shadow-md`}>
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-500">Total  Payments</p>
                                        <p className="text-2xl font-semibold text-slate-900 mt-1">{payments.length}</p>
                                    </div>
                                </div>
                                <Link to={`/Accounts`}>
                                    <a className="absolute left-6 bottom-4 text-sm text-indigo-600 hover:underline">Manage Payments</a>
                                </Link>
                            </div>


                        </div>

                        {/* Recent bookings card */}
                        <div className="bg-white rounded-lg p-6 exsm:p-0 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-[500] text-[rgb(17,24,39)]">Recent Bookings</h3>
                                <Link to="/Bookings">
                                    <a className="text-sm text-indigo-600 hover:underline">View all</a>
                                </Link>
                            </div>

                            <div className="divide-y divide-slate-200">
                                {bookings?.map((b, idx) => (
                                    <div key={b.id} className={`py-4 flex items-start exsm:items-center justify-between ${idx === bookings.length - 1 ? '' : ''}`}>
                                        <div>
                                            <a className="text-indigo-600 text-sm font-medium hover:underline">{b.booking_id} - {b.user_name}</a>
                                            <div className="mt-2 text-slate-500 text-sm flex flex-col justify-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-4 h-4 text-slate-400" />
                                                    <span className="text-[14px]">{b.gmail}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span className="text-[14px]">{`${new Date(b.check_in_date).getFullYear()}/${new Date(b.check_in_date).getMonth() + 1}/${new Date(b.check_in_date).getDate()}`} to {`${new Date(b.check_in_date).getFullYear()}/${new Date(b.check_in_date).getMonth() + 1}/${new Date(b.check_in_date).getDate()}`}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <span className={`items-center px-3 py-1 rounded-full ${b.booking_status === "Pending" ? "bg-black inline-flex text-white" : "hidden"} text-xs font-medium`}>
                                                Pending
                                            </span>

                                            <span className={`items-center px-3 py-1 rounded-full ${b.booking_status === "Confirmed" ? "bg-emerald-700 inline-flex text-white" : "hidden"} text-xs font-medium`}>
                                                Confirmed
                                            </span>

                                            <span className={`items-center px-3 py-1 rounded-full ${b.booking_status === "Cancelled" ? "bg-red-600 inline-flex text-white" : "hidden"} text-xs font-medium`}>
                                                Cancelled
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="dashboard_section" className={`${is_loading ? "block" : "hidden"} w-full ml-auto h-screen overflow-y-scroll`}>
                <div class="max-w-6xl mx-auto p-6">
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        
                        <div class="bg-white rounded-lg shadow p-5">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>
                                <div class="flex-1">
                                    <div class="w-32 h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div class="w-16 h-7 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>


                        
                        <div class="bg-white rounded-lg shadow p-5">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>
                                <div class="flex-1">
                                    <div class="w-36 h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div class="w-12 h-7 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>


                        
                        <div class="bg-white rounded-lg shadow p-5">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 rounded-lg bg-gray-200 animate-pulse"></div>
                                <div class="flex-1">
                                    <div class="w-28 h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div class="w-14 h-7 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <div class="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>


                    
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <div class="w-44 h-5 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div class="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>


                        <div class="space-y-6">
                            
                            <div class="flex items-start justify-between animate-pulse">
                                <div class="flex-1">
                                    <div class="w-56 h-4 bg-gray-200 rounded mb-3"></div>
                                    <div class="w-40 h-3 bg-gray-200 rounded mb-2"></div>
                                    <div class="w-48 h-3 bg-gray-200 rounded"></div>
                                </div>
                                <div class="ml-6">
                                    <div class="w-20 h-6 rounded-full bg-gray-200"></div>
                                </div>
                            </div>


                            <div class="border-t border-gray-100"></div>


                            <div class="flex items-start justify-between animate-pulse">
                                <div class="flex-1">
                                    <div class="w-56 h-4 bg-gray-200 rounded mb-3"></div>
                                    <div class="w-40 h-3 bg-gray-200 rounded mb-2"></div>
                                    <div class="w-48 h-3 bg-gray-200 rounded"></div>
                                </div>
                                <div class="ml-6">
                                    <div class="w-20 h-6 rounded-full bg-gray-200"></div>
                                </div>
                            </div>


                            <div class="border-t border-gray-100"></div>


                            <div class="flex items-start justify-between animate-pulse">
                                <div class="flex-1">
                                    <div class="w-56 h-4 bg-gray-200 rounded mb-3"></div>
                                    <div class="w-40 h-3 bg-gray-200 rounded mb-2"></div>
                                    <div class="w-48 h-3 bg-gray-200 rounded"></div>
                                </div>
                                <div class="ml-6">
                                    <div class="w-20 h-6 rounded-full bg-gray-200"></div>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
            </section>
            <div className="absolute bottom-[-198px] w-full z-30">
                <Footer />
            </div>
        </>
    )
}

export default Dashboard;