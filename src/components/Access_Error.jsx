import Navbar from "./Navbar"
import { Link } from 'react-router'



function Access_Error() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center mt-20 justify-center">
                <h2 className="text-[rgb(17,24,39)] text-[24px] font-[600] font-inter-sans">Access Denied</h2>
                <p className="text-[rgb(75,85,99)] font-[400] text-[16px] leading-[24px] font-inter-sans py-2 ">You don't have permission to access this page.</p>
                <Link to="/">
                    <button className="text-[white] cursor-pointer items-center justify-center  leading-[24px] font-[500] gap-2 text-[16px] flex font-inter-sans border-[2px] bg-[#4F46E5] mt-2 py-[0.5rem] px-[1rem] rounded-[8px]">
                        Back to Home
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Access_Error