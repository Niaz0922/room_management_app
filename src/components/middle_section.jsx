import { Link } from 'react-router'



function middle() {
    return (
        <section class="bg-[#4F46E5] py-15 mt-[0.5rem] font-inter-sans">
            <div class="text-center">
                <h2 class="text-white text-[36px] leading-[40px] font-inter-sans sm:text-[34px] font-bold mb-3">
                    Ready to Book Your Stay?
                </h2>
                <p class="text-[rgb(224,231,255)] text-[20px] leading-[28px] font-[400] font-inter-sans mb-6">
                    Experience the perfect blend of comfort, luxury, and convenience.
                </p>
                <a href="#"
                    class="inline-flex items-center gap-2 bg-white text-[rgb(79,70,229)] px-6 py-3 rounded-lg font-medium text-[16px] hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <Link to="room_book">
                        Book Your Room Today
                    </Link>
                </a>
            </div>
        </section>

    )
}

export default middle