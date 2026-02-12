import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import room_one from "../../assets/room_1.jpeg"
import room_two from "../../assets/room_two.jpeg"
import { NotebookPen } from 'lucide-react';
import { Trash } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from "react";
import { CircleAlert } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { data, Link } from 'react-router'
import { useNavigate } from 'react-router-dom';
import api from "../API/api";
import { X } from 'lucide-react';
function Room() {
    //getting the romms
    const [rooms_object, set_rooms_object] = useState([])
    const [is_loading, set_is_loading] = useState(true)

    const [is_error_success, set_is_error_success] = useState(false);
    const [is_error_failed, set_is_error_failed] = useState(false);
    const [error_message, set_error_message_div] = useState("");


    useEffect(() => {
        set_is_loading(true)
        get_all_rooms()
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



    const [form_state, set_form_state] = useState(false);
    //for form erros 
    const [isError_room_name, set_error_room_name] = useState("Room name is required");
    const [isError_per_night_cost, set_error_per_night_cost] = useState("Price is required");
    const [isError_description, set_error_description] = useState("Description is required");
    const [capacity, set_capacity] = useState(1);
    const [isError_room_image, set_error_room_image] = useState();
    const [amenity, set_error_amenity] = useState(["Wifi"]);
    const [aminity_change, check_emity] = useState('');

    const [is_form_error, set_form_error] = useState(false)

    const [is_form_submit_error, set_is_form_submit_error] = useState(false)
    const [is_form_submit_success, set_form_submit_success] = useState(false)
    const [form_submit_error_message, set_error_message] = useState("");





    //storing the informations in usestate()
    const [room_name, set_room_name] = useState("Room name is required");
    const [per_night_cost, set_per_night_cost] = useState("Price is required");
    const [description, set_description] = useState("Description is required");
    const [capacity_var, set_capacity_value] = useState(1);
    const [room_image, set_room_image] = useState();
    const [amenity_value, set_amenity] = useState(["Wifi"]);
    const [is_available, set_is_available] = useState(true)

    const [is_submitting, set_is_submitting] = useState(false)


    //checking if the image is valid or not

    const [is_error, set_is_Error] = useState(false);
    const [image_error_message, set_is_image_message_Error] = useState("");
    const [image_preview, set_image_preview] = useState();
    const [image, set_image] = useState();
    const [is_image_error, set_is_image_error] = useState({
        is_error: true,
        message: "Please select a image for room"
    });

    useEffect(() => {
        // If ANY of these has a value (not empty or undefined), form_error = true
        if (
            isError_room_name ||
            isError_per_night_cost ||
            isError_description ||
            is_image_error.is_error === true
        ) {
            set_form_error(true);
        } else {
            // If ALL are empty or undefined, form_error = false
            set_form_error(false);
        }
    }, [isError_room_name, isError_per_night_cost, isError_description, is_image_error.is_error]);



    function Handle_Room_Name(e) {
        const value = e.target.value;
        const { name, text_content } = e.target
        set_error_room_name(
            value === ""
                ? "Room name is required"
                : value.length < 2
                    ? "Room name must be at least 2 characters"
                    : ""
        );
        set_room_name(e.target.value)
    }
    function Handle_room_price(e) {
        const value = e.target.value;
        set_error_per_night_cost(
            value === ""
                ? "Price is required"
                : value == 0
                    ? "Price cannot be 0"
                    : ""
        )
        set_per_night_cost(e.target.value)
    }


    function Handle_description(e) {
        const value = e.target.value;
        set_error_description(
            value === ""
                ? "Description is required"
                : value.length < 10
                    ? "Description must be as least 10 characters"
                    : ""
        )
        set_description(e.target.value)

    }

    function Handle_Capacity(e) {
        const value = e.target.value;
        set_capacity(
            value < 1
                ? 1
                : value
        )
        set_capacity_value(Number(e.target.value))

    }

    function Handle_Aminity(e) {
        if (aminity_change !== "" && !amenity_value.includes(aminity_change)) {
            set_error_amenity([...amenity, aminity_change]);
            set_amenity([...amenity_value, aminity_change])

        }


    }

    function Handle_Is_available(e) {
        const is_available = e.target.value === "Available" ? true : false;
        set_is_available(is_available)
    }




    function Handle_Image(event) {
        if (event.target.files && event.target.files[0]) {
            const valid_file_types_array = ["png", "jpg", "jpeg", "gif"];
            const selectedFile = event.target.files[0];
            // Access the file type
            const file_type = selectedFile.type.replace("image/", "");
            set_image(selectedFile)
            if (valid_file_types_array.includes(file_type) && selectedFile) {
                set_is_image_error({ ...is_image_error, is_error: false, message: "" })
                set_image_preview(URL.createObjectURL(selectedFile))


            } else {
                set_is_image_error({ ...is_image_error, is_error: true, message: "Please give us a valid image . Only PNG , JPEG , JPG and GIF images are valid" })
            }
        } else {
            console.log("Give a image")
        }
    }
    useEffect(() => {
        set_is_Error(is_image_error.is_error);
        set_is_image_message_Error(is_image_error.message)

    }, [is_image_error])





    async function Handle_Save_Button(e) {
        e.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        const formData = new FormData();
        formData.append("room_name", room_name);
        formData.append("per_night_cost", String(per_night_cost));
        formData.append("description", description);
        formData.append("capacity_var", capacity_var);
        formData.append("amenity_value", JSON.stringify(amenity_value));
        formData.append("image", image);
        formData.append("Availability", is_available);

        set_is_submitting(true)
        try {
            const response = await api.post("/create_new_room", formData)

            if (response.data.error) {
                set_is_error_failed(true);
                set_error_message_div(response.data.message)


            } else if (!response.data.error) {
                set_is_error_success(true);
                set_error_message_div(response.data.message)

            }

            get_all_rooms()
        } catch {
            set_is_form_submit_error(true)
            set_form_submit_success(true)
            set_error_message("Failed to delete the room")

        } finally {
            set_is_loading(false)
            set_is_submitting(false)
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.querySelector(".container_room").scrollTo({ top: 0, behavior: "smooth" });
        }


    }


    const [open, setOpen] = useState(false);
    const [delete_room_id, set_delete_room_id] = useState(0);
    const [is_deleting, set_is_deleting] = useState(false);

    

    async function Handle_Delete_Button() {

        setOpen(false);

        //deleting the room
        const formDataDelete = new FormData();
        formDataDelete.append("room_id", delete_room_id);

        try {
            const delete_response = await api.post("/delete_Room", formDataDelete)

            if (delete_response.data.error) {
                set_is_error_failed(true);
                set_error_message_div(delete_response.data.message)


            } else if (!delete_response.data.error) {
                set_is_error_success(true);
                set_error_message_div(delete_response.data.message)

            }
            get_all_rooms()

        }

        catch {
            set_form_submit_success(true)
            set_error_message("Failed to delete the room")
        }

        finally {
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.querySelector(".container_room").scrollTo({ top: 0, behavior: "smooth" });
        }


    }





    return (
        <>

            <Navbar />


            <AdminNavbar />


            <div className="main_pro flex mb-20">
                <Sidebar_navbar />
                <div className="container_room h-screen w-full overflow-y-scroll">

                    <main id="dashboard_section" className="flex w-full flex-col justify-between items-start ml-auto">
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

                        <section className="ml-auto w-full">

                            <div className="flex justify-between max-w-[92rem] max-[400px]:px-4 px-4">
                                <h2 className="text-[rgb(17,24,39)] mt-10 font-[600] text-[24px] leading-[32px] ml-[10rem] max-[1020px]:ml-[0rem] max-[400px]:text-[19px] font-inter-sans">Manage Rooms</h2>
                                <button onClick={() => set_form_state(true)} className='text-[rgb(255,255,255)] flex gap-2 cursor-pointer my-[2rem] font-[400] text-[14px] leading-[24px] font-inter-sans bg-[#4f46e5] rounded-[5px] py-[0.5rem] px-[1.3rem]'>
                                    <Plus className="w-[1rem] h-auto" color="white" />
                                    Add Room
                                </button>
                            </div>


                            {/* error success msg----------------=> */}
                            <div id="dashboard_section" className={`alert-2 ${is_form_submit_success ? "flex" : "hidden"} mx-auto max-w-[1350px] sm:items-center p-4 mb-4 text-sm bg-green-100 text-green-800 rounded-lg`} role="alert">
                                <CircleAlert className="w-4" />

                                <div className="ms-2">
                                    {form_submit_error_message}
                                </div>

                                <button type="button"
                                    onClick={() => set_form_submit_success(false)}
                                    className="ms-auto p-1.5 rounded h-8 w-8 flex items-center justify-center">
                                    <X className="w-4" color="#5EE9B4" />
                                </button>
                            </div>
                            {/* error success msg----------------=> */}


                            {/* error error msg----------------=> */}
                            <div id="dashboard_section" className={`alert-3 ${is_form_submit_error ? "flex" : "hidden"} mx-auto max-w-[1350px] sm:items-center p-4 mb-4 text-sm bg-red-100 text-red-800 rounded-lg`} role="alert">
                                <CircleAlert className="w-4" />

                                <div className="ms-2">
                                    {form_submit_error_message}
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


                            <form id="dashboard_section" className={`bg-white w-full ${form_state ? "block" : "hidden"} mx-auto mt-[2rem] max-w-[1350px] mb-[1rem] rounded-lg shadow-sm p-6`}>
                                {/* top row: name + price */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-2">Room Name</label>
                                        <input
                                            onChange={Handle_Room_Name}
                                            name="room_name"
                                            className={`w-full rounded-md border px-3 py-2 text-sm bg-white ${isError_room_name ? "border-red-300" : "border-violet-300 "} placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent ring-0 "border-slate-200"
                                        }`}
                                            placeholder=""
                                        />

                                        <div className="flex items-center gap-2">
                                            <CircleAlert className={`w-[1rem] h-auto ${isError_room_name ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                                            <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{isError_room_name}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-600 mb-2">Price per Night ($) *</label>
                                        <input
                                            type="number"
                                            onChange={Handle_room_price}
                                            className={`w-full rounded-md border px-3  ${isError_per_night_cost ? "border-red-300" : "border-violet-300 "} py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-red-300 ring-0  border-slate-200"
                                        }`}
                                            min={0}
                                        />
                                        <div className="flex items-center gap-2">
                                            <CircleAlert className={`w-[1rem] h-auto ${isError_per_night_cost ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                                            <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{isError_per_night_cost}</p>

                                        </div>
                                    </div>
                                </div>

                                {/* description */}
                                <div className="mt-6">
                                    <label className="block text-sm text-slate-600 mb-2">Description *</label>
                                    <textarea
                                        rows={5}
                                        onChange={Handle_description}
                                        className={`w-full rounded-md border ${isError_description ? "border-red-300" : "border-violet-300 "} px-3 py-3 text-sm bg-white  placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent ring-0 border-slate-200"
                                    }`}
                                        placeholder="Write a short description of the room..."
                                    />
                                    <div className="flex items-center gap-2">
                                        <CircleAlert className={`w-[1rem] h-auto ${isError_description ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                                        <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{isError_description}</p>
                                    </div>
                                </div>
                                {/* capacity + availability */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-2">Capacity *</label>
                                        <input
                                            className={`w-full rounded-md border px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 border-violet-300 focus:border-transparent ring-0 "border-slate-200"
                                        }`}
                                            onChange={Handle_Capacity} type="number"
                                            value={capacity} />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-600 mb-2">Availability</label>
                                        <select
                                            onChange={Handle_Is_available}
                                            className="w-full rounded-md border px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                                        >
                                            <option value="available">Available</option>
                                            <option value="unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                </div>

                                {/* image upload */}
                                <div className="mt-7 ">
                                    <label className="block text-sm text-slate-600 mb-2">Room Image</label>
                                    <main className="w-full border-2 border-dashed border-violet-300 rounded-lg">
                                        <section className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                                            <div className={`${image_preview ? "hidden" : " flex flex-col items-center text-center"}`}>
                                                <div className="w-16 h-16 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"></rect>
                                                        <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
                                                        <path d="M3.5 18.5l6-7 4 5 5-6.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                </div>

                                                <input onChange={(event) => Handle_Image(event)} id="fileInput" type="file" accept="image/png,image/jpeg,image/gif" className="hidden" />
                                                <label htmlFor="fileInput" className="text-violet-600 text-base font-medium mb-2 cursor-pointer">
                                                    Upload a file
                                                </label>
                                                <p className="text-sm text-gray-500 mb-3">or drag and drop</p>
                                                <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
                                            </div>

                                            <div className="relative">
                                                {image_preview ? (
                                                    <>
                                                        <img
                                                            src={image_preview}
                                                            alt="Preview"
                                                            className="object-cover w-[100rem] h-[20rem]"
                                                        />
                                                        <CircleX onClick={() => {
                                                            set_image_preview()
                                                            set_is_image_error({ ...is_image_error, is_error: true, message: "Please give us a image" })
                                                        }} className="absolute top-5 right-5 cursor-pointer" color="red" />
                                                    </>
                                                ) : (
                                                    ""
                                                )}

                                            </div>
                                        </section>
                                    </main>
                                    <div className="flex items-center gap-2">
                                        <CircleAlert className={`w-[1rem] h-auto ${is_error == true ? "block" : "hidden"} mt-3`} color="rgb(220,38,38)" />
                                        <p className="text-[rgb(220,38,38)] h-auto mt-3 text-[14px] font-[400] ">{is_error == true ? image_error_message : ""}</p>
                                    </div>
                                </div>

                                {/* amenities */}
                                <div id="aminity_div" className="mt-6">
                                    <label className="block text-sm text-slate-600 mb-2">Amenities</label>
                                    <div className="flex gap-2">
                                        <input
                                            onChange={(e) => check_emity(e.target.value)}
                                            placeholder="Add an amenity"
                                            className="flex-1 rounded-md border px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                                        />
                                        <button onClick={Handle_Aminity} type="button" className="px-3 py-2 rounded-md bg-violet-100 text-violet-700 text-sm">Add</button>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {amenity.map((amenity_items, index) => {
                                            return (
                                                <span key={index} className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 px-2 py-1 rounded-full text-sm">
                                                    <span className="aminity">{amenity_items}</span>
                                                    <button onClick={(e) => {
                                                        e.target.closest('.inline-flex')?.remove();
                                                        const deleted_aminity_value = e.target.closest('.inline-flex').querySelector(".aminity").innerHTML;
                                                        set_amenity(prev => prev.filter(item => item !== String(deleted_aminity_value)));



                                                    }} type="button" className="text-xs font-bold leading-none cursor-pointer">×</button>
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* actions */}
                                <div className="mt-8 flex cursor-pointer justify-end gap-4">
                                    <button onClick={() => set_form_state(false)} type="button" className="px-4 cursor-pointer py-2 rounded-md border hover:shadow-sm text-sm">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={Handle_Save_Button}
                                        disabled={is_form_error === true}
                                        className={`px-4 py-2 rounded-md cursor-pointer text-sm text-white transition
                                            ${is_form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}
                                            ${is_submitting ? "hidden" : "block"}
                                        `}
                                    >
                                        Save Room
                                    </button>

                                    <button
                                        disabled={is_form_error === true}
                                        className={`px-4 py-2 rounded-md cursor-pointer text-sm text-white transition
                                            ${is_form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}
                                            ${is_submitting ? "block" : "hidden"}
                                        `}
                                    >
                                        Saving
                                    </button>
                                </div>
                            </form>
                        </section>
                    </main>

                    <section id="dashboard_section" className="w-full ml-auto">

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

                        <div className="bg-white shadow-md rounded-lg p-4 max-w-[1350px] mx-auto">
                            {rooms_object.map((room) => {
                                const payload = {
                                    id: room.id,
                                    title: room.room_name,
                                    price: room.room_per_night_cost,
                                    img: room.room_picture,
                                    persons: room.room_capacity,
                                    desc: room.room_desc,
                                    aminity: room.room_aminity,
                                };
                                return (
                                    <>
                                        <div key={room.id} className={`${is_loading ? "hidden" : "block"} room_container`}>
                                            <div className="rooms_each flex items-center justify-between border-b border-[#e5e7eb] py-4">
                                                <div className="flex items-start gap-4">
                                                    <img src={`http://localhost:8000/uploads/${room.room_picture}`} alt="Room" className="w-20 h-20 rounded-md " />
                                                    <div>
                                                        <a href="#" className="text-indigo-600 font-semibold hover:underline">{room.room_name}</a>
                                                        <p className="text-gray-700 text-sm">${room.room_per_night_cost} per night</p>
                                                        <p className="text-gray-400 text-xs">{room.room_name}</p>
                                                        <div className="flex items-center gap-2 mt-1 text-sm">
                                                            <span className="flex items-center text-gray-600"><i className="fa fa-user mr-1"></i> Capacity: {room.room_capacity}</span>
                                                            <span className="flex items-center text-green-500"><span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>{room.is_available ? "Available" : "Unavailable"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-8">
                                                    <div className="flex items-center gap-2">
                                                        <Link to={`/room_edit/${payload.id}`}>
                                                            <button onClick={(e) => Handle_Modal(e)} className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full">
                                                                <NotebookPen className="w-[1rem] h-auto" />
                                                            </button>
                                                        </Link>

                                                        <button onClick={() => { setOpen(true); set_delete_room_id(room.id) }} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                                                            <Trash className="w-[1rem] h-auto" />
                                                        </button>
                                                        {/* Modal Code ----=> */}

                                                        {/* Backdrop */}
                                                        <div className={`${open ? "fixed" : "hidden"} inset-0 z-40 bg-[#302e2e1a]`}></div>

                                                        {/* Modal Wrapper */}

                                                        <div className={`${open ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center px-4`}>
                                                            <div className="relative w-full max-w-md">

                                                                {/* Modal Box */}
                                                                <div className="relative bg-white text-gray-800 rounded-lg shadow-xl p-6">

                                                                    {/* Close Button */}
                                                                    <button
                                                                        onClick={() => setOpen(false)}
                                                                        className="absolute top-3 right-3 text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center"
                                                                    >
                                                                        ✕
                                                                    </button>

                                                                    {/* Content */}
                                                                    <div className="text-center">
                                                                        <svg
                                                                            className="mx-auto mb-4 w-12 h-12 text-gray-400"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                            />
                                                                        </svg>

                                                                        <h3 className="mb-6 text-gray-700 text-base">
                                                                            Are you sure you want to delete this room?
                                                                        </h3>

                                                                        {/* Actions */}
                                                                        <div className="flex justify-center gap-4">

                                                                            <button
                                                                                onClick={Handle_Delete_Button}
                                                                                className="px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:ring-4 focus:ring-red-300"
                                                                            >
                                                                                Yes, I'm sure
                                                                            </button>



                                                                            <button
                                                                                onClick={() => setOpen(false)}
                                                                                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:ring-4 focus:ring-gray-300"
                                                                            >
                                                                                No, cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="aminities flex">
                                                        {JSON.parse(room.room_aminity).map((amenity, index) => (
                                                            <span
                                                                key={index}
                                                                className="border px-3 py-1 rounded text-sm text-gray-600 mr-2"
                                                            >
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                    </div>


                                                </div>



                                            </div>
                                        </div>
                                    </>
                                )


                            })}
                        </div>



                    </section>
                </div >
            </div>
            <div className="absolute bottom-[-198px] w-full z-30">
                <Footer />
            </div>

        </>
    )
}

export default Room

