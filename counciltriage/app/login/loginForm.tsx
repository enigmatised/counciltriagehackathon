"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function logInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <main className="flex justify-center items-center py-10">
            <div className="flex flex-col items-center border-2 px-3 pt-4 rounded-[5px]">
                <div className="text-4xl">
                    <h1>LOGIN DASHBOARD</h1>
                </div>
                <div className="border-t border-gray-700 w-full my-4"></div>
                <div>
                    <form className="flex flex-col gap-4 pb-3">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border px-2 py-2 rounded"
                            required/>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border px-2 py-2 rounded"
                            required/>
                        <button type="submit" className="bg-amber-200 rounded-[15px] px-4 py-2 font-medium cursor-pointer">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}