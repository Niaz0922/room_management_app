import { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import AdminNavbar from "./AdminNavbar";
import Sidebar_navbar from "./Sidebar_navbar";
import { Plus } from 'lucide-react';
import { CircleX } from 'lucide-react';


function Settings() {

    const [is_error, set_is_Error] = useState(false);
    const [form_state, set_form_state] = useState(false)
    const [image_error_message, set_is_image_message_Error] = useState("");
    const [image, set_image] = useState();
    const [is_image_error, set_is_image_error] = useState({
        is_error: true,
        message: "Please select a image for room"
    });

    function Handle_Image(event) {
        if (event.target.files && event.target.files[0]) {
            const valid_file_types_array = ["png", "jpg", "jpeg", "gif"];
            const selectedFile = event.target.files[0];
            // Access the file type
            const file_type = selectedFile.type.replace("image/", "");
            if (valid_file_types_array.includes(file_type) && selectedFile) {
                set_is_image_error({ ...is_image_error, is_error: false, message: "" })
                set_image(URL.createObjectURL(selectedFile))
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


    const [Primary_color, set_primary_color] = useState("#4F46E5");
    const [Secondary_color, set_secondary_color] = useState("#1F2937");
    const [font_family, set_font_family] = useState("Inter");
    localStorage.setItem(
        "theme",
        JSON.stringify({
            font: "Inter",
            primaryColor: "#4F46E5",
            secondaryColor: "#1F2937"
        })
    );

    function Handle_primary_color(e) {
        set_primary_color(e.target.value)
        localStorage.setItem(
            "theme",
            JSON.stringify({
                font: font_family,
                primaryColor: Primary_color,
                secondaryColor: Secondary_color
            })
        );
    }


    function Handle_Secondary_color(e) {
        set_secondary_color(e.target.value)
        localStorage.setItem(
            "theme",
            JSON.stringify({
                font: font_family,
                primaryColor: Primary_color,
                secondaryColor: Secondary_color
            })
        );
    }

    function Handle_font(e) {
        set_font_family(e.target.value)
        localStorage.setItem(
            "theme",
            JSON.stringify({
                font: font_family,
                primaryColor: Primary_color,
                secondaryColor: Secondary_color
            })
        );
    }



    return (
        <>
            <Navbar />
            <AdminNavbar />
            <main className="flex h-screen flex-row  min-[1580px]:gap-90 max-[1578px]:gap-40 max-[1019px]:gap-25 max-[560px]:gap-10 ">
                <div className="w-[16rem] max-[1019px]:w-0">
                    <Sidebar_navbar />
                </div>
                <section className="w-50 pt-10 pr-[13rem] flex flex-1 flex-col h-screen overflow-y-scroll  
                max-[1019px]:w-full 
                max-[1019px]:px-10 
                max-[619px]:px-2 
                max-[1019px]:ml-0 
                max-[1588px]:w-[calc(100%-300px)] 
                max-[1588px]:pr-[2rem] 
                max-[1212px]:pr-[0.8rem] 
                max-[1212px]:w-[calc(100%-280px)]
            ">
                    <div className="main w-[87%]">
                        <div>
                            <h2 className="text-[20px] font-[700] text-[rgb(31,41,55)] font-inter-sans mb-12">Settings</h2>
                        </div>

                        <div className="settings pl-8">
                            <h1 className="text-[18px] font-[400] font-inter-sans">Theme Settings</h1>
                            <p className="text-[14px] font-[400] text-[rgb(55,65,81)] mt-3">Font Family</p>
                            <div className="w-[100%] ">
                                <select id="status" name="status" onChange={Handle_font} class="w-full rounded-md border border-none px-4 py-3 text-[14px] bg-white placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-indigo-100">
                                    <option>Inter</option>
                                    <option>Pending</option>
                                    <option>Confirmed</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <p className="text-[14px] font-[400] text-[rgb(107,114,128)] pl-8">Preview text with Inter font</p>

                        <div className="">
                            <p className="text-[14px] font-[400] text-[rgb(55,65,81)] mt-3 mb-2">Primary Color</p>
                            <div className="flex items-center gap-2">
                                <input type="color" onChange={Handle_primary_color} className="rounded-[.25rem] cursor-pointer w-[2rem] h-[2rem]" value={Primary_color} name="" id="" />
                                <input type="text" className="w-full h-[50px] rounded-[.375rem] border-1 px-[.5rem] py-[.75rem] border-[rgb(209,213,219)]" value={Primary_color} id="" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-[14px] font-[400] text-[rgb(55,65,81)] mt-3 mb-2">Secondary Color</p>
                            <div className="flex items-center gap-2">
                                <input type="color" className="rounded-[.25rem] cursor-pointer w-[2rem] h-[2rem]" onChange={Handle_Secondary_color} name="" value={Secondary_color} id="" />
                                <input type="text" className="w-full h-[50px] rounded-[.375rem] border-1 px-[.5rem] py-[.75rem] border-[rgb(209,213,219)]" value={Secondary_color} name="" id="" />
                            </div>
                        </div>

                        <div className="pl-8 mr-8 mt-10 mb-2">
                            <p className="text-[14px] font-[400] text-[rgb(55,65,81)] mt-3 mb-2">Preview</p>
                            <div style={{ backgroundColor: Primary_color }} className={`w-full h-[57px] rounded-[.25rem] font-[400] font-inter-sans text-white text-[16px] pl-4 pt-4`}>Primary Color Sample Text</div>
                        </div>

                        <div className="pl-8 mr-8  mt-2 mb-2">
                            <div style={{ backgroundColor: Secondary_color }} className={`w-full h-[57px] rounded-[.25rem] font-[400] font-inter-sans text-white text-[16px] pl-4 pt-4`}>Secondary Color Sample Text</div>
                        </div>

                        <div className="mt-12 border-b-[0.1px] border-[#d1d5db]"></div>

                        <div>
                            <h2 className="text-[rgb(17,24,39)] font-[400] text-[18px] font-inter-sans py-6 pl-2">Hotel Logo</h2>
                        </div>


                        <main className="w-full border-2 border-dashed border-violet-300 rounded-lg ">
                            <section className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                                <div className={`${image ? "hidden" : " flex flex-col items-center text-center"}`}>
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
                                    {image ? (
                                        <>
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="object-cover w-[100rem] h-[20rem]"
                                            />
                                            <CircleX onClick={() => set_image()} className="absolute top-5 right-5 cursor-pointer" color="red" />
                                        </>
                                    ) : (
                                        ""
                                    )}

                                </div>
                            </section>
                        </main>

                        <div className="mt-6 border-b-[0.1px] border-[#d1d5db] mb-6"></div>

                    </div>


                </section>
            </main>
            <Footer />
        </>
    )
}

export default Settings