import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from "react";
import '../App.css'
import { Clock } from 'lucide-react';
import room_one from "../assets/room_1.jpeg"
import { useEffect, useRef } from "react";
import { CircleAlert } from 'lucide-react';
import api from "./API/api";
import { X } from 'lucide-react';




function Form_Room_books(props) {


    const [check_In_date, setInDate] = useState(new Date());
    const [check_in_date_minDate, set_min_date] = useState(new Date());
    const [invalidDates, setDates] = useState([]);




    const [is_Date_error, set_Date_error] = useState(false);


    const [nights, setNights] = useState(1)

    useEffect(() => {
        if (invalidDates.length > 0) {
            invalidDates.map((invalid_date) => {
                var invalid_Dates_format = `${new Date(invalid_date).getDate()} ${new Date(invalid_date).toLocaleString('default', { month: 'long' })} ${new Date(invalid_date).getFullYear()}`
                const today_date = new Date()
                const today_date_format = `${today_date.getDate()} ${today_date.toLocaleString('default', { month: 'long' })} ${today_date.getFullYear()}`

                if (invalid_Dates_format == today_date_format) {
                    set_Date_error(true)
                }
            })


        }



    })
    const [check_Out_date, setOutDate] = useState(useEffect(() => {
        const newCheckOut = new Date(check_In_date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        setOutDate(newCheckOut);
    }, [check_In_date]));


    useEffect(() => {
        setting_booked_Dates();

    }, [])


    //  Whenever check-in date changes, update check-out date
    useEffect(() => {
        const newCheckOut = new Date(check_In_date);
        newCheckOut.setDate(newCheckOut.getDate() + 1);
        setOutDate(newCheckOut);
    }, [check_In_date]);




    useEffect(() => {
        const date1 = check_In_date;
        const date2 = check_Out_date;

        const ms = date2 - date1.getTime();
        const oneDay = 1000 * 60 * 60 * 24;

        const diffInDays = Math.round(ms / oneDay);
        setNights(diffInDays)
    }, [check_In_date, check_Out_date])



    var selected_element = document.getElementById(props?.id ?? "26");

    const [title, set_title] = useState();
    const [price, set_price] = useState();
    const [image_src, set_image_src] = useState();
    const [room_description, set_room_description] = useState();

    useEffect(() => {
        if (!selected_element) return;

        var title = selected_element.querySelector(".title")?.innerHTML || "";
        var price = selected_element.querySelector(".price")?.innerHTML || "";
        var image = selected_element.querySelector("#picture")?.src || "";
        var room_description = selected_element.querySelector(".room_description")?.value || "";

        set_title(title)
        set_price(price)
        set_image_src(image)
        setting_booked_Dates(title)
        set_room_description(room_description)
    }, [selected_element])

    const [total_price_sum, set_total_price] = useState(price);

    useEffect(() => {
        const price_without_dollar = Number(String(price).replace(/[^0-9.]/g, ""));
        const sum = price_without_dollar * nights
        set_total_price(sum)
    }, [nights, price])



    function setting_booked_Dates(title) {
        const all_bookings_response = api.get("get_booked_days");
        all_bookings_response.then((res) => {

            const all_bookings = res.data.all_bookings;
            const arr = [];
            all_bookings.map((e) => {
                if (title == e.room_name) {
                    const start_date = new Date(e.check_in_date)
                    const end_date = new Date(e.check_out_date)
                    const daysBetween = (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);
                    for (var i = 0; i <= daysBetween; i++) {
                        const temp = new Date();
                        temp.setDate(start_date.getDate() + i)
                        arr.push(temp)
                    }
                    setDates(arr)
                }
            })
        })
    }






    const [username_error, set_username_Error] = useState("Please give us a Full Name")
    const [phone_number_error, set_phone_number_Error] = useState("Please give us a Phone Number")
    const [email_error, set_email_error] = useState("Please Give us a valid email")
    const [form_error, set_form_error] = useState(true);

    const [is_form_submit_error, set_is_form_submit_error] = useState(false);
    const [is_form_submit_success, set_form_submit_success] = useState(false);
    const [error_message, set_error_message] = useState("");


    const [username, set_username] = useState("")
    const [phone_number, set_phone_number] = useState("")
    const [email, set_email] = useState("");
    const [guest_note, set_guest_note] = useState("");
    const [is_loading, set_is_loading] = useState(false);


    useEffect(() => {
        if (username_error != "" || phone_number_error != "" || email_error != "" || is_Date_error) {
            set_form_error(true)
        } else {
            set_form_error(false)
        }
    }, [username_error, phone_number_error, email_error, is_Date_error])

    function Handle_Username(e) {
        set_username_Error(e.target.value == "" ? "Please Give us a Full Name" : e.target.value.length < 5 ? "The Full Name must be bigger than 5 characters" : "")
        set_username(e.target.value)

    }

    function Handle_Phone_Number(e) {
        const value = e.target.value;
        set_phone_number_Error(
            value === ""
                ? "Please give us a phone number"
                : !/^\d+$/.test(value)
                    ? "Only numbers are allowed"
                    : !value.startsWith("61")
                        ? "Invalid number. Only Australian (+61) numbers are allowed"
                        : value.length !== 11
                            ? "Australian phone number must be exactly 11 digits"
                            : ""
        );
        set_phone_number(value < 0 ? "" : value)
    }

    const [count_date, set_count_Date] = useState(0);

    function Handle_CheckDate_Error(e, date_type) {
        let date_arr = [];

        if (date_type === "CheckInDate") {
            const start_date = new Date(e.target.value);
            const end_date = new Date(start_date);
            end_date.setDate(start_date.getDate() + 1);

            const daysBetween =
                (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

            for (let i = 0; i < daysBetween; i++) {
                const temp = new Date(start_date);
                temp.setDate(temp.getDate() + i);

                date_arr.push(
                    `${temp.getDate()} ${temp.toLocaleString("en-US", {
                        month: "long",
                    })} ${temp.getFullYear()}`
                );
            }
        }

        if (date_type === "CheckOutDate") {
            const start_date = new Date(check_In_date);
            const end_date = new Date(e.target.value);

            const daysBetween =
                (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

            for (let i = 0; i < daysBetween; i++) {
                const temp = new Date(start_date);
                temp.setDate(temp.getDate() + i);

                date_arr.push(
                    `${temp.getDate()} ${temp.toLocaleString("en-US", {
                        month: "long",
                    })} ${temp.getFullYear()}`
                );
            }
        }



        if (!invalidDates || invalidDates.length === 0) {
            set_Date_error(false);
            return;
        }

        const count = invalidDates.reduce((acc, d) => {
            const bookedDate = new Date(d);

            const dateFormat = `${bookedDate.getDate()} ${bookedDate.toLocaleString(
                "en-US",
                { month: "long" }
            )} ${bookedDate.getFullYear()}`;

            return date_arr.includes(dateFormat) ? acc + 1 : acc;
        }, 0);

        set_Date_error(count > 0);
        set_count_Date(count)
    }


    useEffect(() => {
        if (check_In_date) {
            Handle_CheckDate_Error({ target: { value: check_In_date } }, "CheckInDate");
        }
        if (check_Out_date) {
            Handle_CheckDate_Error({ target: { value: check_Out_date } }, "CheckOutDate");
        }
    }, [props.id])



    // console.log(booked_dates_arr)



    function Handle_Email(e) {
        set_email_error(
            e.target.value === ""
                ? "Please give us an email"
                : !e.target.value.includes("@")
                    ? "Give us a valid email"
                    : e.target.value.length < 10
                        ? "Email must be at least 10 characters"
                        : ""
        );
        set_email(e.target.value)


    }



    async function Handle_Booking_Request() {
        const min = 10000000;
        const max = 99999999;
        const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const booking_id = `IFA-${newNumber}`;

        const formdata = new FormData();


        formdata.append("booking_id", booking_id);
        formdata.append("user_name", username);
        formdata.append("room_name", title);
        formdata.append("room_description", room_description);
        formdata.append("room_picture", image_src);
        formdata.append("check_in_date", check_In_date);
        formdata.append("check_out_date", check_Out_date);
        formdata.append("gmail", email);
        formdata.append("night", nights.toString());
        formdata.append("phone", phone_number);
        formdata.append("booking_status", "Pending");
        formdata.append("total_amount", total_price_sum.toString());
        formdata.append("paid", "0");
        formdata.append("due", "0");
        formdata.append("admin_notes", "");
        formdata.append("guest_notes", guest_note ?? "");
        set_is_loading(true)
        try {
            const response = await api.post("create_booking", formdata);
            setting_booked_Dates();

            if (response.data.error) {
                set_is_form_submit_error(true);
                set_error_message(response.data.message)
            } else if (!response.data.error) {
                set_form_submit_success(true)
                set_error_message(response.data.message)
            }



        } catch {

        }
        finally {
            set_is_loading(false)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

    }


    return (<>



        <div class={`${props.is_loading ? "block" : "hidden"} p-6 animate-pulse`}>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <div class="h-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div>
                    <div class="h-12 bg-gray-200 rounded-lg"></div>
                </div>
            </div>


            <div class="mb-6">
                <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div class="h-12 bg-gray-200 rounded-lg"></div>
                <div class="h-3 w-48 bg-gray-100 rounded mt-2"></div>
            </div>


            <div class="mb-6">
                <div class="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div class="h-12 bg-gray-200 rounded-lg"></div>
                <div class="h-3 w-56 bg-gray-100 rounded mt-2"></div>
            </div>


            <div class="mb-6">
                <div class="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div class="h-12 bg-gray-200 rounded-lg"></div>
                <div class="h-3 w-52 bg-gray-100 rounded mt-2"></div>
            </div>


            <div class="mb-8">
                <div class="h-4 w-64 bg-gray-200 rounded mb-2"></div>
                <div class="h-28 bg-gray-200 rounded-lg"></div>
            </div>


            <div class="bg-gray-50 rounded-lg p-4 flex gap-4 mb-6">

                <div class="w-20 h-16 bg-gray-200 rounded-md"></div>


                <div class="flex-1 space-y-3">
                    <div class="h-4 w-40 bg-gray-200 rounded"></div>
                    <div class="h-3 w-32 bg-gray-200 rounded"></div>

                    <div class="flex gap-3">
                        <div class="h-4 w-24 bg-gray-200 rounded"></div>
                        <div class="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>

                    <div class="space-y-2">
                        <div class="h-3 w-48 bg-gray-100 rounded"></div>
                        <div class="h-3 w-48 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </div>


            <div class="h-12 bg-gray-300 rounded-lg"></div>

        </div>

        <form class={`${props.is_loading ? "hidden" : "block"} space-y-6 mt-7`}>
            {/* error success msg----------------=> */}
            <div className={`alert-2 ${is_form_submit_success ? "flex" : "hidden"} mx-auto max-w-[1350px] sm:items-center p-4 mb-4 text-sm bg-green-100 text-green-800 rounded-lg`} role="alert">
                <CircleAlert className="w-4" />

                <div className="ms-2">
                    {error_message}
                </div>

                <button type="button"
                    onClick={() => set_form_submit_success(false)}
                    className="ms-auto p-1.5 rounded h-8 w-8 flex items-center justify-center">
                    <X className="w-4" color="#5EE9B4" />
                </button>
            </div>
            {/* error success msg----------------=> */}


            {/* error error msg----------------=> */}
            <div className={`alert-3 ${is_form_submit_error ? "flex" : "hidden"} mx-auto max-w-[1350px] sm:items-center p-4 mb-4 text-sm bg-red-100 text-red-800 rounded-lg`} role="alert">
                <CircleAlert className="w-4" />

                <div className="ms-2">
                    {error_message}
                </div>

                <button type="button"
                    onClick={(e) => {
                        set_is_form_submit_error(false)
                    }}
                    className="ms-auto p-1.5 rounded h-8 w-8 flex items-center justify-center">
                    <X className="w-4" color="#991B1B" />
                </button>
            </div>
            {/* error error msg----------------=> */}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="text-[14px] leading-[20px] font-[400] font-inter-sans text-[rgb(55,65,81)] mb-2 block">Check-in Date (12:00 PM)</label>
                    <div class="relative">
                        <Calendar onChange={(e) => { setInDate(e.value); Handle_CheckDate_Error(e, "CheckInDate") }} minDate={check_in_date_minDate} disabledDates={invalidDates} className="bg-amber-200 w-full shadow" value={check_In_date} showIcon />
                        <p className={`${is_Date_error ? "block" : "hidden"} text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400]`}>The date is already booked</p>
                    </div>
                </div>

                <div>
                    <label class="text-[14px] leading-[20px] font-[400] font-inter-sans text-[rgb(55,65,81)] mb-2 block">Check-Out Date (12:00 PM)</label>
                    <div class="relative">
                        <Calendar onChange={(e) => { setOutDate(e.value); Handle_CheckDate_Error(e, "CheckOutDate") }} minDate={new Date(check_Out_date)} disabledDates={invalidDates} className="w-full shadow" value={check_Out_date} showIcon />
                    </div>
                </div>
            </div>

            <div>
                <label class="text-sm text-slate-600 mb-2 block">Full Name</label>
                <div class="relative">
                    <input onChange={Handle_Username} value={username} type="text" placeholder="Your full name" class="pl-[1rem] p shadow py-3 w-full rounded border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" />
                </div>
                <div className="flex items-center gap-2">
                    <CircleAlert className={`w-[1rem] h-auto ${username_error ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                    <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{username_error}</p>
                </div>
            </div>

            <div>
                <label class="text-sm text-slate-600 mb-2 block">Phone Number</label>
                <div class="relative">
                    <input type="number" value={phone_number} onChange={Handle_Phone_Number} placeholder="+61 412 345 678" class="pl-[1rem] p shadow py-3 w-full rounded border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" />
                </div>
                <div className="flex items-center gap-2">
                    <CircleAlert className={`w-[1rem] h-auto ${phone_number_error ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                    <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{phone_number_error}</p>
                </div>
            </div>

            <div>
                <label class="text-sm text-slate-600 mb-2 block">Email Address</label>
                <div class="relative">
                    <input type="email" value={email} onChange={Handle_Email} placeholder="you@example.com" class="pl-[1rem] shadow pr-4 py-3 w-full rounded border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200" />
                </div>
                <div className="flex items-center gap-2">
                    <CircleAlert className={`w-[1rem] h-auto ${email_error ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                    <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{email_error}</p>
                </div>
            </div>


            <div>
                <label class="text-sm text-slate-600 mb-2 block">Special Requests or Notes <span class="text-sm text-slate-400">(Optional)</span></label>
                <textarea onChange={(e) => set_guest_note(e.target.value)} rows="4" placeholder="Any special requests, dietary requirements, or additional information..." class="w-full shadow rounded border border-slate-200 p-4 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"></textarea>
                <p class="text-xs text-slate-400 mt-2">Let us know about any special requirements or preferences for your stay.</p>
            </div>


            <div class="bg-slate-50 border border-slate-100 rounded-lg p-4 flex items-start gap-4">
                <div class="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-slate-200">
                    <img src={image_src} alt="room" class="w-full h-full object-cover" />
                </div>

                <div class="flex-1">
                    <h3 class="text-[18px] leading-[28px] font-[400] font-inter-sans  text-[rgb(17,24,39)]">{title ? title : "256 Burwood Hwy (D1)"}</h3>
                    <p class="text-sm leading-[20px] font-[400] font-inter-sans text-[rgb(107,114,128)]">{title ? title : "256 Burwood Hwy (D1)"}</p>

                    <div class="flex items-center gap-3 mt-3 text-sm text-slate-500">
                        <div class="text-sm">
                            <span class="text-[rgb(107,114,128)] text-[14px] font-[400] leading-[20px] font-inter-sans">{price ? price : "$90/night"}</span>
                            <span class="text-[rgb(107,114,128)] text-[14px] font-[400] leading-[20px] font-inter-sans"> × {nights} nights = </span>
                            <span class="text-indigo-600 font-semibold ml-1">${total_price_sum}</span>
                        </div>
                    </div>

                    <div class="flex flex-col mt-3 text-sm text-slate-500">
                        <div class="flex items-center gap-1">
                            <Clock className="w-[12px]" color="rgb(107,114,128)" />
                            <span className="text-[rgb(107,114,128)] font-[300] text-[12px] leading-[16px] font-inter-sans">Check-in: at 12:00 PM</span>
                        </div>

                        <div class="flex items-center gap-1">
                            <Clock className="w-[12px]" color="rgb(107,114,128)" />
                            <span className="text-[rgb(107,114,128)] font-[300] text-[12px] leading-[16px] font-inter-sans">Check-out:<span></span> at 12:00 PM</span>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <button disabled={form_error === true} onClick={Handle_Booking_Request} type="button" className={`${form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 cursor-pointer"} ${is_loading ? "hidden" : "block"} text-white w-full py-3 rounded-md text-lg font-medium shadow-md transition `}>
                    Review Booking
                </button>

                <button disabled={form_error === true} onClick={Handle_Booking_Request} type="button" className={`${form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700 cursor-pointer"} ${is_loading ? "block" : "hidden"} text-white w-full py-3 rounded-md text-lg font-medium shadow-md transition `}>
                    Saving
                </button>
            </div>
        </form>


    </>)
}


export default Form_Room_books;


// useEffect(() => {
//     if (invalidDates.length > 0) {
//         invalidDates.map((e) => {
//             var booked_dates = new Date(e)
//             var today_date = new Date();
//             var date_format = booked_dates.toISOString().split("T")[0];
//             var date_format_today = today_date.toISOString().split("T")[0];



//             // if (date_format == date_format_today) {
//             //     today_date.setDate(today_date.getDate() + 1);
//             //     console.log(today_date)
//             // }



//             if (date_format_today == date_format) {
//                 console.log("Booked")
//             }
//         })
//     }
// })
