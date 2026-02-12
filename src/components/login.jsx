import { use, useState } from "react";
import Navbar from "./Navbar";
import { Building, Link } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { TriangleAlert } from 'lucide-react';

function Login() {
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [isError, set_error] = useState(false);
    const navigate = useNavigate();

    function HandleLogin(e) {
        e.preventDefault()
        if (username == "admin@new.com" && password === "123456") {
            const time = new Date().setDate(new Date().getDate() + 10);
            localStorage.setItem("token", JSON.stringify({
                auth: true,
                time: time,
                is_admin: true,
                admin_name:"Admin"
            }));
            navigate("/");
        } else {
            set_error(true)
        }

    }

    return (

        <>
            <Navbar />

            <section>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                    <div className="w-full max-w-xl">
                        {/* Center column: icon + title + hint text */}
                        <div className="flex flex-col items-center">


                            <Building className="w-[3rem] h-auto" color="#4f46e5" />




                            <h1 className="mt-6 text-3xl font-[600] text-[rgb(17,24,39)]">Sign in to your account</h1>

                            <p className="mt-2 text-sm text-slate-500 text-center max-w-[36rem]">
                                Use <span className="font-medium text-slate-700">admin@new.com</span> / <span className="font-medium">123456</span> for admin access
                                <br />
                                Or <span className="font-medium text-slate-700">user@new.com</span> / <span className="font-medium">123456</span> for regular user
                            </p>
                        </div>

                        {/* Card */}
                        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
                            <form className="space-y-5">
                                <div class={`${isError === true ? "flex" : "hidden"} items-center gap-2 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400" role="alert`}>
                                    <TriangleAlert className="w-[1.3rem] h-auto" />
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">Invalid Login Credentials</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setusername(e.target.value)}
                                        required
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-2">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e) => setpassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <button
                                        onClick={(event) => HandleLogin(event)}
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}


export default Login;