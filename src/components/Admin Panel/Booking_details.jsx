import Footer from "../Footer";
import Navbar from "../Navbar";
import { ArrowLeft } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Link } from 'react-router'
import { User } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MailOpen } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from "../API/api";
import DateTimePicker from 'react-datetime-picker';
import { Calendar } from "lucide-react";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { WalletCards } from 'lucide-react';



function Booking_details() {

  const [date, set_date] = useState(new Date())

  const [is_loading, set_is_loading] = useState(true);
  const [modal_state, set_modal_state] = useState(false);
  const [discount_amount_flat, set_discount_flat] = useState();
  const [discount_amount_percentage, set_discount_percentage] = useState();
  const [discount_type, set_discount_type] = useState("Flat Discount")
  const [total_after_discount, set_total_after_discount] = useState("Flat Discount")
  const [is_loading_update_notes, set_is_loading_update_notes] = useState(null);
  const [is_error_success, set_is_error_success] = useState(false);
  const [is_error_failed, set_is_error_failed] = useState(false);
  const [error_message, set_error_message] = useState("");


  //getting the payload object
  const navigate = useNavigate();
  const Location = useLocation();

  useEffect(() => {
    if (!Location.state) {
      navigate("/Bookings", { replace: true });
    }
  }, []);
  const booking_object_state = Location.state;

  if (!booking_object_state) {
    navigate("/Bookings", { replace: true });
    return null;   // ⛔ STOP render here
  }



  const booking_details = Location.state?.room; // The object you passed






  //creating the delete booking logic
  async function Handle_delete_booking() {
    const formData = new FormData();
    formData.append("booking_id", booking_details.id);

    const response = await api.post("/delete_booking", formData);

    if (!response.data.error) {
      navigate("/Bookings", { state: true, replace: true })
    } else {

    }
  }






  //getting the booking object from backend

  const [booking_id_db, set_booking_id_db] = useState()
  const [booking_id, set_booking_id] = useState()
  const [user_name, set_user_name] = useState()
  const [room_name, set_room_name] = useState()
  const [room_description, set_room_description] = useState()
  const [room_picture, set_room_picture] = useState()
  const [check_in_date, set_check_in_date] = useState()
  const [check_out_date, set_check_out_date] = useState()
  const [gmail, set_gmail] = useState()
  const [night, set_night] = useState()
  const [phone, set_phone] = useState()
  const [booking_status, set_booking_status] = useState()
  const [total_amount, set_total_amount] = useState()
  const [discount_type_booking, set_discount_type_booking] = useState()
  const [is_discount, set_is_discount] = useState(false)
  const [discount_amount, set_discount_amount] = useState()
  const [paid, set_paid] = useState()
  const [admin_notes, set_admin_notes] = useState()
  const [guest_notes, set_guest_notes] = useState()



  const [booking_object, set_booking_object] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const booking_id_db = await get_booking(); // wait for booking to finish
      if (booking_id_db) {
        await get_payments(booking_id_db); // then fetch payments using that id
      }
    };

    fetchData();
  }, []);



  const get_booking = async () => {
    set_is_loading(true)
    try {
      const response = await api.get("/get_booking_by_id", {
        params: {
          booking_id: booking_details.id
        }
      });

      const booking_object = Array.isArray(response.data.booking) ? response.data.booking[0] : response.data.booking;
      set_booking_id_db(booking_object.id)
      set_booking_object(booking_object)
      set_booking_id(booking_object.booking_id)
      set_user_name(booking_object.user_name)
      set_room_name(booking_object.room_name)
      set_room_description(booking_object.room_description)
      set_room_picture(booking_object.room_picture)
      set_check_in_date(booking_object.check_in_date)
      set_check_out_date(booking_object.check_out_date)
      set_gmail(booking_object.gmail)
      set_night(booking_object.night)
      set_phone(booking_object.phone)
      set_booking_status(booking_object.booking_status)
      set_total_amount(booking_object.total_amount)
      set_discount_amount(booking_object.discount_amount)
      set_discount_type_booking(booking_object.discount_type)
      set_is_discount(booking_object.is_discount)
      set_total_after_discount(booking_object.total_amount_after_discount)
      set_paid(booking_object.paid)
      set_admin_notes(booking_object.admin_notes)
      set_guest_notes(booking_object.guest_notes)


      return booking_object.id
    }

    catch {
      console.log("Error")
    }

    finally {
      setTimeout(() => {
        set_is_loading(false);
      }, 1000);
    }
  }


  const [payment_object, set_payment_object] = useState([])


  const get_payments = async (booking_id) => {
    set_is_loading(true)
    try {
      const response = await api.get("/get_payment_by_id", {
        params: {
          id: booking_id
        }
      });
      set_payment_object(response.data.payment_by_id)



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





  const [updated_admin_notes, set_updated_admin_notes] = useState("");
  const [updated_guest_notes, set_updated_guest_notes] = useState("");

  useEffect(() => {
    if (admin_notes) {
      set_updated_admin_notes(admin_notes);
    }
  }, [admin_notes]);

  useEffect(() => {
    if (guest_notes) {
      set_updated_guest_notes(guest_notes);
    }
  }, [guest_notes]);


  async function Handle_Update_Notes(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append("updated_admin_notes", updated_admin_notes);
    formData.append("updated_guest_notes", updated_guest_notes);
    formData.append("booking_id", booking_details.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    set_is_loading_update_notes(true)
    try {
      const response = await api.post("/update_notes", formData);
      if (response.data.error) {
        set_is_error_failed(true);
        set_error_message(response.data.message)
      } else if (!response.data.error) {
        set_is_error_success(true);
        set_error_message(response.data.message)
      }

    } catch {

    } finally {
      set_is_loading_update_notes(false)

    }
  }


  const [bookingStatus, setBookingStatus] = useState("");
  useEffect(() => {
    if (booking_status) {
      setBookingStatus(booking_status);
    }
  }, [booking_status]);



  async function Handle_Booking_Status(e) {
    setBookingStatus(e.target.value)

    const formData = new FormData();
    formData.append("booking_status", e.target.value);
    formData.append("booking_id", booking_details.id);

    const response = await api.post("/update_booking_status", formData);

    if (response.data.error) {
      set_is_error_failed(true);
      set_error_message(response.data.message)
    } else if (!response.data.error) {
      set_is_error_success(true);
      set_error_message(response.data.message)
    }

  }


  //handle discount function
  async function Handle_Discount() {
    if (!Boolean(is_discount)) {
      set_modal_state(false)
      if (discount_type == "Flat Discount") {
        const final_amount = Math.ceil(total_amount - discount_amount_flat)

        const formData = new FormData();

        formData.append("booking_id", booking_id_db);
        formData.append("discount_amount", discount_amount_flat);
        formData.append("discount_type", `Flat Discount $(${discount_amount_flat})`);
        formData.append("total_after_discount", final_amount);

        const apply_discount = await api.post("apply_discount", formData)
        window.scrollTo({ top: 800, behavior: "smooth" });
        if (apply_discount.data.error) {
          set_is_error_failed(true);
          set_error_message(apply_discount.data.message)
        } else if (!apply_discount.data.error) {
          set_is_error_success(true);
          set_error_message(apply_discount.data.message)
          set_is_discount(true)
          set_discount_amount(discount_amount_flat)
          set_discount_type_booking(`Flat Discount $(${discount_amount_flat})`)
          set_total_after_discount(final_amount)
        }


      } else if (discount_type == "Percentage") {
        const total = total_amount;
        const discount = discount_amount_percentage;

        const finalAmount = Math.ceil(total - (discount / 100) * total);


        const formData = new FormData();

        formData.append("booking_id", booking_id_db);
        formData.append("discount_amount", ceil((discount / 100) * total));
        formData.append("discount_type", `Percentage ${discount}%`);
        formData.append("total_after_discount", finalAmount);

        const apply_discount = await api.post("apply_discount", formData)
        window.scrollTo({ top: 800, behavior: "smooth" });
        if (apply_discount.data.error) {
          set_is_error_failed(true);
          set_error_message(apply_discount.data.message)
        } else if (!apply_discount.data.error) {
          set_is_error_success(true);
          set_error_message(apply_discount.data.message)
          set_is_discount(true)
          set_discount_amount((discount / 100) * total)
          set_discount_type_booking(`Percentage ${discount}%`)
          set_total_after_discount(finalAmount)
        }



      }

    }
  }

  const [payment_amount, set_payment_amount] = useState("");
  const [payment_method, set_payment_method] = useState("Cash");
  const [payment_date, set_payment_date] = useState(new Date());








  async function Handle_Payment() {
    set_payment_amount(0)

    const time_in_format = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM format
    }).format(payment_date);

    const payment_date_final = `${new Date(payment_date).toLocaleString('en-US', { month: 'short' })} ${new Date(payment_date).getDate()} ${new Date(payment_date).getFullYear()} ${time_in_format}`

    const paidNum = Number(paid) || 0;
    const paymentAmountNum = Number(payment_amount) || 0;
    const totalPaid = paidNum + paymentAmountNum;

    const formData = new FormData();
    formData.append("id", booking_id_db);
    formData.append("booking_id", booking_id);
    formData.append("payment_from", user_name);
    formData.append("payment_method", payment_method);
    formData.append("payment_amount", payment_amount);
    formData.append("total_payment_paid", totalPaid);
    formData.append("payment_date", payment_date_final);
    formData.append("gmail", gmail);
    formData.append("room_name", room_name);
    formData.append("total_amount", total_amount);
    formData.append("paid", totalPaid);
    formData.append("check_in_date", check_in_date);
    formData.append("check_out_date", check_out_date);



    const payment_insert = await api.post("/add_payment", formData);

    const new_payments = {
      id: crypto.randomUUID(),
      booking_id: booking_id,
      booking_id_db: booking_id_db,
      check_in_date: check_in_date,
      check_out_date: check_out_date,
      gmail: gmail,
      paid: paid,
      payment_amount: payment_amount,
      payment_date: `${new Date(payment_date).toLocaleString("default", { month: 'short' })} ${new Date(payment_date).getDate()} ${new Date(payment_date).getFullYear()} ${new Date(payment_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
      payment_from: user_name,
      payment_method: payment_method,
      room_name: room_name,
      total_amount: total_amount,
    }

    set_payment_object((prev) => [...prev, new_payments])

    window.scrollTo({ bottom: 0, behavior: "smooth" });
    if (payment_insert.data.error) {
      set_is_error_failed(true);
      set_error_message(payment_insert.data.message)


    } else if (!payment_insert.data.error) {
      set_is_error_success(true);
      set_error_message(payment_insert.data.message)
      set_paid(totalPaid)
    }


  }


  






  return (
    <>
      <Navbar />
      <section className={`${is_loading ? "hidden" : "block"} booking_details mx-auto max-w-[1340px] px-[2rem] mt-[2rem]`}>
        <div class={`${is_error_success ? "flex" : "hidden"} mt-6 items-center gap-4 p-4 fixed top-0 right-4 rounded-md max-w-4xl mx-auto shadow-[0_2px_16px_-3px_rgba(144,144,144,0.4)] bg-white`} role="alert">
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
              <h6 class="text-slate-900 text-base font-medium">Success! The operation completed successfuly</h6>
              <p class="text-slate-500 text-[13px] mt-1">{error_message}</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => set_is_error_success(false)} class="shrink-0 w-[14px] h-[14px] ml-auto cursor-pointer fill-gray-400 hover:fill-red-400" viewBox="0 0 320.591 320.591">
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
          </svg>
        </div>

        <div class={`${is_error_failed ? "flex" : "hidden"} mt-6 items-center gap-4 p-4 fixed top-0 right-4 rounded-md max-w-4xl mx-auto shadow-[0_2px_16px_-3px_rgba(144,144,144,0.4)] bg-white`} role="alert">
          <span class="block absolute w-1 rounded-full h-[80%] my-auto top-0 bottom-0 left-2  bg-red-600"></span>
          <div class="flex sm:items-center gap-4 ml-3 max-sm:flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-6 h-6 fill-red-600" viewBox="0 0 500 500">
              <clipPath id="a">
                <path d="M0 0h500v500H0z" data-original="#000000" />
              </clipPath>
              <g clip-path="url(#a)">
                <path fill-rule="evenodd" d="M250 500c138.071 0 250-111.929 250-250S388.071 0 250 0 0 111.929 0 250s111.929 250 250 250zm-68.781-265.687c-10.545-10.544-27.64-10.544-38.184 0-10.544 10.545-10.544 27.64 0 38.184l66.468 66.468c10.544 10.544 27.639 10.544 38.184 0l127.279-127.279c10.544-10.544 10.544-27.64 0-38.184s-27.64-10.544-38.184 0L228.595 281.69z" clip-rule="evenodd" data-original="#000000" />
              </g>
            </svg>
            <div>
              <h6 class="text-slate-900 text-base font-medium">Success! The operation completed successfuly</h6>
              <p class="text-slate-500 text-[13px] mt-1">{error_message}</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => set_is_error_failed(false)} class="shrink-0 w-[14px] h-[14px] ml-auto cursor-pointer fill-gray-400 hover:fill-red-400" viewBox="0 0 320.591 320.591">
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
          </svg>
        </div>

        <div className={`second_part`}>
          <Link to="/Bookings">
            <a className="text-[17px] text-indigo-600 px-[0.5rem] flex gap-1 items-center hover:underline mb-[2rem]">
              <ArrowLeft color="#4F46E5" className="w-[18px] h-[18px]" />
              {"Back to Bookings"}
            </a>
          </Link>
          {/* booking Details */}

          <div className="px-[1.5rem] py-[1.25rem] -b-[1px] -[rgb(229,231,235)] flex justify-between items-center">
            <div>
              <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] font-inter-sans">Booking Details</h2>
              <p className="text-[.875rem] text-[rgb(107,114,128)] font-inter-sans mt-[.30rem]">Booking #{booking_id}</p>
            </div>

            <div className="flex gap-4">
              <div>
                <select
                  value={bookingStatus}
                  onChange={Handle_Booking_Status}
                  className="w-full rounded-md  px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* this is the delete booking button */}
              <button
                class="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-sm shadow-sm hover:opacity-95"
                aria-label="Delete booking"
                onClick={Handle_delete_booking}
              >
                <Trash />
                {"Delete Booking"}
              </button>
            </div>
          </div>



          <div class="px-[1.5rem] py-[1.25rem] bg-white rounded-md border border-slate-100 p-6">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">


              <div class="space-y-6">

                <div class="flex flex-col gap-1 justify-center">

                  <div className="flex items-center gap-1">
                    <User color="#62748e" className=" w-[1.25rem]" />
                    <p class="text-sm text-slate-500">Guest Name</p>
                  </div>
                  <div>
                    <p class="text-slate-900 text-[0.875rem] mt-1">{user_name}</p>
                  </div>

                </div>


                <div class="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1">
                    <Phone color="#62748e" className=" w-[1.25rem]" />
                    <p class="text-sm text-slate-500">Phone Number</p>
                  </div>
                  <p class="text-slate-900 text-[0.875rem] mt-1">{phone}</p>

                </div>


                <div class="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1">
                    <Calendar color="#62748e" className=" w-[1.25rem]" />
                    <p class="text-sm text-slate-500">Check-out</p>
                  </div>
                  <p class="text-slate-900 text-[0.875rem] mt-1">{check_out_date}</p>

                </div>
              </div>


              <div class="space-y-6">

                <div class="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1">
                    <MailOpen color="#62748e" className=" w-[1.25rem]" />
                    <p class="text-sm text-slate-500">Email</p>
                  </div>
                  <p class="text-slate-900 text-[0.875rem] mt-1">{gmail}</p>

                </div>


                <div class="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-1">
                    <Calendar color="#62748e" className=" w-[1.25rem]" />
                    <p class="text-sm text-slate-500">Check-in</p>
                  </div>
                  <p class="text-slate-900 text-[0.875rem] mt-1">{check_in_date}</p>

                </div>
              </div>

            </div>
          </div>


          {/* Room Details */}
          <div className="mt-6 border-t border-slate-100 pt-6 px-[1.5rem] py-[1.25rem]">
            <h4 className="text-slate-700 font-medium mb-4">Room Details</h4>


            <div className="flex items-start gap-4 bg-slate-50 rounded-md p-4 border border-slate-100">
              <img src={room_picture} alt="room" className="w-20 h-16 object-cover rounded-md" />


              <div className="flex-1">
                <p className="font-semibold text-slate-800">{room_name}</p>
                <p className="text-slate-500 text-sm mt-2 leading-5">
                  {room_description}
                </p>
              </div>
            </div>
          </div>






          {/* Booking Notes section */}
          <div className="mt-6 bg-white rounded-lg p-6  px-[1.5rem] py-[1.25rem]">
            <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] font-inter-sans border-b-[1px] border-[rgb(229,231,235)] py-6">Booking Notes</h2>



            <div className="space-y-4 pt-6">
              <div>
                <label className="text-sm text-slate-500">Admin Notes (Internal)</label>
                <textarea
                  value={updated_admin_notes}
                  onChange={(e) => set_updated_admin_notes(e.target.value)}
                  className="w-full mt-2 p-3 border border-slate-200 rounded-md min-h-[90px] text-slate-900"
                  placeholder="Admin Special Notes"
                />
                <p className="text-xs text-slate-400 mt-2">These notes are only visible to admin staff and will not be shared with guests.</p>
              </div>


              <div>
                <label className="text-sm text-slate-500">Guest Notes/Special Requests</label>
                <textarea value={updated_guest_notes} onChange={(e) => set_updated_guest_notes(e.target.value)} className="w-full mt-2 p-3 border border-slate-200 rounded-md min-h-[80px] text-slate-900" placeholder="Guest special requests, dietary requirements, preferences..."

                />
              </div>
            </div>

            <div className="flex justify-between mt-2 border-b-[1px] border-[rgb(229,231,235)] pb-5">
              <p className="text-xs text-slate-400 mt-2">Notes and special requests from the guest.</p>
              <button
                onClick={Handle_Update_Notes}
                class={`${is_loading_update_notes ? "hidden" : "inline-flex"} cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(67,56,202)] text-white font-medium text-sm shadow-sm hover:opacity-95`}
                aria-label="Delete booking"
              >
                {"Update Notes"}
              </button>

              <button
                disabled
                class={`${is_loading_update_notes ? "inline-flex" : "hidden"} cursor-pointer  items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(69,60,166)] text-white font-medium text-sm shadow-sm hover:opacity-95`}
                aria-label="Delete booking"
              >
                {"Updating Notes"}
              </button>
            </div>
          </div>
          {/* Discount Management Section */}
          <div className="flex justify-between items-center mt-2 px-[1.5rem] py-[1.25rem] border-b-[1px] border-[rgb(229,231,235)]">
            <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] font-inter-sans">Discount Management</h2>

            <button
              onClick={(e) => set_modal_state(true)}
              disabled={Boolean(is_discount)}
              class={`${is_discount ? "bg-gray-400" : "bg-[rgb(22,163,74)]"} inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg  text-white font-medium text-sm shadow-sm hover:opacity-95`}
              aria-label="Delete booking"
            >
              {"Apply Discount"}
            </button>

            {/* modal code starts here */}
            {modal_state && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center">

                {/* Backdrop */}
                <div
                  onClick={() => set_modal_state(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm
                 transition-opacity duration-300 opacity-100"
                />

                {/* Modal */}
                <div
                  className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-xl
                 transform transition-all duration-300
                 scale-100 opacity-100 translate-y-0 bg-white"
                >
                  {/* Body */}
                  <div className="flex flex-col gap-4 p-6">
                    <div>
                      <label className="block mb-2 text-sm text-slate-600">Discount Type</label>
                      <select
                        onChange={(e) => set_discount_type(e.target.value)}
                        className="w-full rounded-md border border-slate-200 rounded-md px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                      >
                        <option value="Flat Discount">Flat Discount</option>
                        <option value="Percentage">Percentage (%)</option>

                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm text-slate-600">{discount_type}</label>
                      <input

                        onChange={(e) => {
                          if (e.target.value < 0) {
                            set_discount_percentage(0)
                          } else if (e.target.value > 100) {
                            set_discount_percentage(100)
                          } else {
                            set_discount_percentage(e.target.value)
                          }


                        }}
                        type="number"
                        value={discount_amount_percentage}
                        className={`${discount_type == "Percentage" ? "block" : "hidden"} w-full text-sm border border-slate-200 rounded-md px-3 py-2
                       transition focus:outline-none focus:border-slate-400
                       hover:border-slate-300 shadow-sm focus:shadow`}
                        placeholder="Enter the discount amount in Dollar"
                      />


                      <input

                        onChange={(e) => {
                          if (e.target.value < 0) {
                            set_discount_flat(0)
                          } else if (Number(e.target.value) > total_amount) {
                            set_discount_flat(total_amount)
                          } else if (Number(e.target.value) == total_amount) {
                            set_discount_flat(0)
                          } else {
                            set_discount_flat(e.target.value)
                          }
                        }}
                        type="number"
                        value={discount_amount_flat}
                        className={`${discount_type == "Flat Discount" ? "block" : "hidden"} w-full text-sm border border-slate-200 rounded-md px-3 py-2
                       transition focus:outline-none focus:border-slate-400
                       hover:border-slate-300 shadow-sm focus:shadow`}
                        placeholder="Enter the discount amount in Dollar"
                      />



                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0">
                    <button onClick={Handle_Discount} className="w-full bg-[#4338ca] text-white py-2 rounded-md transition cursor-pointer hover:bg-[#423aa2]">
                      Apply Discount
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* modal code starts here */}

          </div>

          {/* price summery and  Final Price Section */}

          <div className="px-10 border-b-[1px] border-[rgb(229,231,235)]">
            <p className="text-[rgb(17,24,39)] font-[500] text-[18px] font-inter-sans pt-6 pb-3 ">Price Summary</p>
            <div className="flex justify-between items-center">
              <p className="text-[rgb(17,24,39)] font-[500] text-[18px] font-inter-sans pt-3 pb-3">Original Price:</p>
              <p className="text-[rgb(79,70,229)] text-[18px] font-[500]">${total_amount}</p>
            </div>

            <div className={`${is_discount ? "flex" : "hidden"} justify-between items-center`}>
              <p className="text-[rgb(17,24,39)] font-[500] text-[18px] font-inter-sans pt-3 pb-3">Discount Amount ({discount_type_booking}):</p>
              <p className="text-[rgb(79,70,229)] text-[18px] font-[500]">${discount_amount}</p>
            </div>

            <div className="flex justify-between items-center pb-6 border-b-[1px] border-[rgb(229,231,235)]">
              <p className="text-[rgb(17,24,39)] font-[500] text-[18px] font-inter-sans pt-3 pb-3">Total Amount :</p>
              <p className="text-[rgb(79,70,229)] text-[18px] font-[500]">${total_amount - discount_amount}</p>
            </div>

          </div>
          {/* payment status Section */}

          <div className="px-[1.5rem] py-[1.25rem] border-b-[1px] border-[rgb(229,231,235)]">
            <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] pt-8  pb-2 font-inter-sans">Payment Status</h2>
          </div>
          {/* Payment Status Section */}

          <div className="px-[2.5rem] mt-6 py-[1.25rem]">
            <div className="flex justify-between items-center pb-2">
              <p>Total Amount:</p>
              <p className="font-[600]">${total_amount - discount_amount}</p>
            </div>

            <div className="flex justify-between items-center pb-2">
              <p>Paid Amount:</p>
              <p className="text-[rgb(22,163,74)] font-[600]">${paid}</p>
            </div>

            <div className="flex justify-between items-center pb-2">
              <p>Remaining Amount:</p>
              <p className="text-[rgb(220,38,38)] font-[600]">${(total_amount - discount_amount) - paid}</p>
            </div>
          </div>
          {/* Payment history Section */}

          <div className="px-[1.5rem] py-[1.25rem] border-b-[1px] border-[rgb(229,231,235)]">
            <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] pt-4  pb-5 font-inter-sans">Payment History</h2>
          </div>
          {/* Bank Details Section Section */}

          <div className="bank_details">
            {
              payment_object.map((e) => (
                <div className="flex items-center justify-between px-[2.2rem] py-[1.25rem]" key={e.id}>
                  <div className="flex items-center gap-2">
                    <DollarSign color="rgb(187,192,200)" className={`${e.payment_method == "Cash" ? "block" : "hidden"}`} />
                    <CreditCard color="rgb(187,192,200)" className={`${e.payment_method == "Credit Card" ? "block" : "hidden"}`} />
                    <WalletCards color="rgb(187,192,200)" className={`${e.payment_method == "Mobile" ? "block" : "hidden"}`} />
                    <p className="text-[rgb(0,0,0)] font-[500] text-[16px]">{e.payment_method}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[rgb(107,114,128)] text-[16px] font-[400]">{e.payment_date}</p>
                    <p className="text-[16px] font-[700] ">${e.payment_amount}</p>
                  </div>
                </div>
              ))
            }

            <h2 className={`${payment_object.length == 0 ? "block text-[23px] text-center my-6" : "hidden"}`}>No Payments Right Now</h2>

          </div>

          {/* add payment Section Section */}

          <div className="px-[1.5rem] py-[1.25rem] border-b-[1px] border-[rgb(229,231,235)]">
            <h2 className="text-[rgb(17,24,39)] font-[700] text-[20px] leading-[20px] pt-4  pb-5 font-inter-sans">Add Payment</h2>
            <div class=" w-full p-6">

              <form class="flex flex-col sm:flex-row gap-4">

                <div class="w-full sm:w-1/3">
                  <label class="block text-sm text-gray-600 mb-2">Amount</label>
                  <div class="relative">

                    <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">

                      <DollarSign />
                    </span>

                    <input
                      type="number"
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          set_payment_amount(0)
                        } else if (e.target.value > ((total_amount - discount_amount) - paid)) {
                          set_payment_amount((total_amount - discount_amount) - paid)
                        }
                        else {
                          set_payment_amount(e.target.value)
                        }
                      }}
                      placeholder="0.00"
                      value={payment_amount}
                      class="w-full rounded-md border border-gray-300 px-12 py-3 placeholder-[#c6cbd1] bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      aria-label="Amount"
                    />
                  </div>
                </div>


                <div class="w-full sm:w-1/3">
                  <label class="block text-sm text-gray-600 mb-2">Payment Method</label>
                  <div class="relative">
                    <select
                      class="appearance-none w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      aria-label="Payment Method"
                      onChange={(e) => {
                        set_payment_method(e.target.value)
                      }}
                    >
                      <option>Cash</option>
                      <option>Credit Card</option>
                      <option>Mobile</option>
                    </select>

                    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>


                <div class="w-full sm:w-1/3">
                  <div class="relative">
                    <div>
                      <label class="text-[14px] leading-[20px] font-[400] font-inter-sans text-[rgb(55,65,81)] mb-2 block">Payment Date & Time</label>
                      <div className="flex items-center">
                        <DateTimePicker onChange={(date) => set_payment_date(date)} value={payment_date} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>


              <div class="mt-6">
                <button
                  disabled={payment_amount === "" ? true : false}
                  className={`${payment_amount === "" || payment_amount == 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#5b46f4] cursor-pointer"}  w-full rounded-md py-3 text-white font-medium text-[14px]  hover:opacity-95 transition`}
                  type="button"
                  onClick={Handle_Payment}
                >
                  Add Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${is_loading ? "block" : "hidden"}`}>
        {/* {"loading Animation starts"} */}
        <div class={` max-w-6xl mx-auto p-6 space-y-8 animate-pulse`}>
          <div className="max-w-7xl mx-auto p-6 space-y-10 animate-pulse">
            {/* Top: Back + Title + Actions */}
            <div className="space-y-6">
              <div className="w-40 h-4 bg-gray-200 rounded" />


              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-3">
                  <div className="w-72 h-8 bg-gray-200 rounded" />
                  <div className="w-44 h-4 bg-gray-200 rounded" />
                </div>


                <div className="flex items-center gap-3">
                  <div className="w-28 h-10 bg-gray-200 rounded-lg" />
                  <div className="w-36 h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>


            {/* Booking Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="space-y-3 w-full">
                      <div className="w-40 h-4 bg-gray-200 rounded" />
                      <div className="w-32 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}


                {[1, 2, 3].map((i) => (
                  <div key={"r" + i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="space-y-3 w-full">
                      <div className="w-44 h-4 bg-gray-200 rounded" />
                      <div className="w-36 h-3 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Room Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-16 bg-gray-200 rounded" />
                <div className="flex-1 space-y-3">
                  <div className="w-64 h-5 bg-gray-200 rounded" />
                  <div className="w-80 h-4 bg-gray-200 rounded" />
                </div>
              </div>
            </div>


            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="w-40 h-5 bg-gray-200 rounded" />


              <div className="space-y-4">
                <div className="w-full h-24 bg-gray-200 rounded" />
                <div className="w-full h-24 bg-gray-200 rounded" />
              </div>
            </div>


            {/* Discount + Price Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
              <div className="w-56 h-5 bg-gray-200 rounded" />
              <div className="w-24 h-6 bg-gray-200 rounded" />
            </div>


            {/* Payment Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="w-48 h-5 bg-gray-200 rounded" />


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>


            {/* Payment History */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="w-44 h-5 bg-gray-200 rounded" />


              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                    <div className="w-56 h-4 bg-gray-200 rounded" />
                  </div>
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>


            {/* Add Payment Form */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div className="w-40 h-5 bg-gray-200 rounded" />


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>


              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        {/* {"loading Animation ends"} */}



      </section >
      <Footer />








    </>
  )
}

export default Booking_details