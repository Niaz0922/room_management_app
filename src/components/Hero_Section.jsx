import Hero_image from "../assets/hero_section.jpg"
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router'


function Hero_section() {

    return (
        <section className="">
            <div className="bg-[rgb(55,48,163)] relative">
                <img
                    className="h-[26.5rem] object-cover opacity-[0.3] align-middle w-full"
                    src={Hero_image}
                    alt=""
                />

                {/* <-- Only this className was changed to center the block both vertically & horizontally */}
                <div className="hero_content absolute inset-0 flex items-center justify-center max-w-[80rem] mx-auto">
                    <div>
                        <h2 className="smex:text-60px leading-[40px] text-center text-[36px] text-white mb-[1.5rem] font-[600] smex:line-height-60px font-inter-sans">
                            Welcome to Accommodation Booking
                        </h2>
                        <p className="text-[rgb(224,231,255)] max-w-[48rem] text-center mx-auto font-[400] leading-[32px] text-[24px] font-inter-sans">
                            Experience luxury and comfort in our premium accommodations. Book your perfect stay today.
                        </p>

                        <div className="flex gap-4 justify-center mt-[2rem]">
                            <Link to="room_book">
                                <button className="text-[#4F46E5] cursor-pointer leading-[24px] font-[500] gap-2 items-center justify-center text-[16px] flex font-inter-sans bg-white py-[0.85rem] px-[2rem] rounded-[8px]">
                                    <CalendarDays color="#4F46E5" />
                                    Book Now
                                </button>
                            </Link>
                            <Link to="room_book">
                                <button className="text-[white] transition-all duration-200 cursor-pointer items-center justify-center  ease-out hover:text-[#4F46E5] leading-[24px] font-[500] gap-2 text-[16px] flex font-inter-sans border-[2px] border-white hover:bg-white py-[0.75rem] px-[2rem] rounded-[8px]">
                                    <CalendarDays className="hover:text-[#4F46E5]" />
                                    View Rooms
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section >

    )

}

export default Hero_section