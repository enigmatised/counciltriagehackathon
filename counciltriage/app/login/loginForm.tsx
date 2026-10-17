"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/");
            router.refresh();
        }
    }

    return (
        <main className="flex justify-center items-center py-10">
            <div className="flex flex-col items-center border-2 px-3 pt-4 rounded-[5px]">
                <div className="text-4xl">
                    <h1>LOGIN DASHBOARD</h1>
                </div>
                <div className="border-t border-gray-700 w-full my-4"></div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-3">
                        <input
                            type="email"
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
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <button type="submit" className="bg-amber-200 rounded-[15px] px-4 py-2 font-medium cursor-pointer">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}