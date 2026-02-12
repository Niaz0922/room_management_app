import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar_navbar from "./Sidebar_navbar";
import { useEffect, useState } from "react";
import { CircleAlert } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { Link } from 'react-router'
import { useParams } from "react-router-dom";
import api from "../API/api";




function Room_edit() {
    const { id } = useParams();

    const [room, setRoom] = useState(null)

    const [room_id, set_room_id] = useState()
    const [room_Name, set_Name] = useState('')
    const [room_Description, set_room_desc] = useState("")
    const [room_capacity, set_room_capacity] = useState(0);
    const [room_night_cost, set_room_night_cost] = useState("");
    const [image, set_image] = useState();
    const [image_preview, set_image_preview] = useState("");
    const [room_aminity, set_room_aminity] = useState([]);

    const [is_error_room_api, set_room_api_status] = useState(true);
    const [is_loading, set_is_loading] = useState(true);


    const Get_room_id = async () => {
        set_is_loading(true)
        try {
            const res = await api.get("/get_room_by_id", {
                params: { id }
            });
            const room_object = Array.isArray(res.data.room_by_id) ? res.data.room_by_id[0] : res.data.room_by_id;

            setRoom(room_object); // always save object
            set_room_id(room_object.id)
            set_Name(room_object.room_name)
            set_room_desc(room_object.room_desc)
            set_room_capacity(room_object.room_capacity)
            set_room_night_cost(room_object.room_per_night_cost)
            set_image_preview(`http://localhost:8000/uploads/${room_object.room_picture}`)
            set_room_aminity(JSON.parse(room_object.room_aminity));


            if (res.status === 200) {
                set_room_api_status(false)
            } else {
                set_room_api_status(true)
            }




        } catch (err) {
            console.error("Error", err);
        }

        finally {
            set_is_loading(false);
        }
    };

    useEffect(() => {
        if (id) {
            Get_room_id()
        }

    }, [id])


    //for form erros
    const [isError_room_name, set_error_room_name] = useState("");
    const [isError_per_night_cost, set_error_per_night_cost] = useState("");
    const [isError_description, set_error_description] = useState("");
    const [isError_room_image, set_error_room_image] = useState();
    const [aminity_change, set_aminity_change] = useState('')
    const [is_image_change, set_ImageChange] = useState(false);

    const [is_submitting, set_is_submitting] = useState(false)

    const [is_available, set_is_available] = useState("Available")



    function Handle_Room_Name(e) {
        const value = e.target.value;
        set_Name(value)
        set_error_room_name(
            value === ""
                ? "Room name is required"
                : value.length < 2
                    ? "Room name must be at least 2 characters"
                    : ""
        );
    }

    function Handle_room_price(e) {
        const value = e.target.value;

        set_room_night_cost(e.target.value)
        set_error_per_night_cost(
            value === ""
                ? "Price is required"
                : value == 0
                    ? "Price cannot be 0"
                    : ""
        )
    }


    function Handle_description(e) {
        const value = e.target.value
        set_room_desc(value)
        set_error_description(
            value === ""
                ? "Description is required"
                : value.length < 20
                    ? "Description must be as least 20 characters"
                    : ""
        )
    }

    function Handle_Capacity(e) {
        const value = e.target.value;
        if (value < 1) {
            set_room_capacity(1)
        } else {
            set_room_capacity(value)
        }
    }


    function Handle_Aminity(e) {
        if (!room_aminity.includes(aminity_change)) {
            set_room_aminity([...room_aminity, aminity_change]);
        }
    }

    //checking if the image is valid or not

    const [is_error, set_is_Error] = useState(false);
    const [image_error_message, set_is_image_message_Error] = useState("");
    const [is_image_error, set_is_image_error] = useState({
        is_error: false,
        message: ""
    });



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

                if (selectedFile.name === room?.room_picture) {
                    set_ImageChange(false)
                } else {
                    set_ImageChange(true)
                }


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



    const [is_form_error, set_form_error] = useState(false)



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



    const [is_error_success, set_is_error_success] = useState(false);
    const [is_error_failed, set_is_error_failed] = useState(false);
    const [error_message, set_error_message] = useState("");


    async function Handle_Update_button(e) {

        e.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        document.querySelector(".main_section").scrollTo({ top: 0, behavior: "smooth" });
        set_is_submitting(true)
        try {

            const formData = new FormData();
            formData.append("id", room_id);
            formData.append("room_name", room_Name);
            formData.append("per_night_cost", String(room_night_cost));
            formData.append("description", room_Description);
            formData.append("capacity_var", room_capacity);
            formData.append("amenity_value", JSON.stringify(room_aminity));
            formData.append("is_image_change", is_image_change ? 1 : 0);
            formData.append("Availability", is_available === "Available" ? true : false);
            if (is_image_change) {
                formData.append("image", image);
            }
            const response = await api.post("/update_room", formData)

            if (response.data.error) {
                set_is_error_failed(true);
                set_error_message(response.data.message)


            } else if (!response.data.error) {
                set_is_error_success(true);
                set_error_message(response.data.message)
                
            }
            formData.forEach((e) => {
                console.log(e)
            })




        } catch {
            set_form_error(true)

        } finally {
            setTimeout(() => {
                set_is_submitting(false)
            }, 900);

        }



    }




    return (
        <>

            <Navbar />
            <Sidebar_navbar />
            <section id="dashboard_section" className={`${is_loading ? "block" : "hidden"} loading_animation w-full ml-auto h-screen `}>
                <div className="w-full max-w-[1350px] mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>

                                <div className="h-4 w-36 bg-gray-200 rounded mb-3 animate-pulse"></div>

                                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>

                            <div>
                                <div className="h-4 w-48 bg-gray-200 rounded mb-3 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>
                        </div>


                        <div>
                            <div className="h-4 w-28 bg-gray-200 rounded mb-3 animate-pulse"></div>
                            <div className="h-32 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>

                            <div>
                                <div className="h-4 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                            </div>
                        </div>


                        <div>
                            <div className="h-4 w-28 bg-gray-200 rounded mb-3 animate-pulse"></div>
                            <div className="relative border-2 border-dashed border-purple-300 rounded-lg p-4 animate-pulse">

                                <div className="h-56 md:h-64 w-full bg-gray-200 rounded-md"></div>


                                <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">

                                </div>


                                <div className="mt-4 space-y-2">
                                    <div className="h-3 w-44 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-64 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className={`${is_loading ? "hidden" : "block"}`}>
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

                <section id="dashboard_section" className={`main_section ${is_error_room_api ? "hidden" : "block"} w-full ml-auto  h-screen overflow-y-scroll`}>
                    <div className="flex w-full justify-between max-w-[1500px]">
                        <h2 className="text-[rgb(17,24,39)] mt-10 font-[600] text-[24px] leading-[32px] ml-[10rem] font-inter-sans">Edit Rooms</h2>
                    </div>
                    <form id="dashboard_section" className={`bg-white w-full mx-auto mt-[2rem] max-w-[1350px] mb-[1rem] rounded-lg shadow-sm p-6`}>
                        {/* top row: name + price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-slate-600 mb-2">Room Name</label>
                                <input
                                    onChange={Handle_Room_Name}
                                    className={`w-full rounded-md border px-3 py-2 text-sm bg-white ${isError_room_name ? "border-red-300" : "border-violet-300 "} placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent ring-0 "border-slate-200"
                                        }`}
                                    placeholder="Room Name"
                                    value={room_Name}
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
                                    value={room_night_cost}
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
                                value={room_Description}
                            ></textarea>
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
                                    value={room_capacity} />
                            </div>

                            <div>
                                <label className="block text-sm text-slate-600 mb-2">Availability</label>
                                <select
                                    onClick={(e) => set_is_available(e.target.value)}
                                    className="w-full rounded-md border px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Unavailable">Unavailable</option>
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
                                                    set_is_image_error({ ...isError_room_image, is_error: true, message: "Please give us an image" })
                                                }
                                                } className="absolute top-5 right-5 cursor-pointer" color="red" />
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
                                    onChange={(e) => set_aminity_change(e.target.value)}
                                    placeholder="Add an amenity"
                                    className="flex-1 rounded-md border px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent border-slate-200"
                                />
                                <button onClick={Handle_Aminity} type="button" className="px-3 py-2 rounded-md bg-violet-100 text-violet-700 text-sm">Add</button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {room_aminity.map((amenity_items) => {
                                    return (
                                        <span id={1} className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 px-2 py-1 rounded-full text-sm">
                                            <span className="aminity">{amenity_items}</span>
                                            <button onClick={(e) => {
                                                const deleted_aminity_value = e.target.closest('.inline-flex').querySelector(".aminity").innerHTML;
                                                set_room_aminity(prev => prev.filter(item => item !== String(deleted_aminity_value)));
                                            }} type="button" className="text-xs font-bold leading-none cursor-pointer">×</button>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>

                        {/* actions */}{console.log(room_aminity)}
                        <div className="mt-8 flex justify-end gap-4">

                            <button disabled={is_form_error} type="submit" onClick={Handle_Update_button} className={`
                            ${is_form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"} px-4 py-2 rounded-md text-white text-sm cursor-pointer 
                            ${is_submitting ? "hidden" : "block"}`}
                            >
                                Update Room
                            </button>



                            <button
                                disabled={is_form_error === true}
                                className={`px-4 py-2 rounded-md cursor-pointer text-sm text-white transition
                                            ${is_form_error ? "bg-gray-400 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"}
                                            ${is_submitting ? "block" : "hidden"}
                                        `}
                            >
                                Updating
                            </button>

                        </div>
                    </form>
                </section>


                <section id="dashboard_section" className={`${is_error_room_api ? "flex" : "hidden"} items-center justify-center bg-white dark:bg-gray-900 w-full ml-auto h-screen`}>
                    <div className="py-8 px-4 lg:py-16 h-full lg:px-6 mx-auto">
                        <div className="mx-auto max-w-screen-sm text-center flex flex-col justify-center items-center">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">404</h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something is wrong</p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, sorry we can't find the room according to the given id </p>
                            <a className="bg-blue-600 rounded-xl text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" href="/Rooms">
                                Back to Homepage
                            </a>
                        </div>
                    </div>
                </section>
            </main>


            <div className="absolute bottom-[-198px] w-full z-30">
                <Footer />
            </div>
        </>
    )
}

export default Room_edit