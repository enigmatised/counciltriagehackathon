"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close the dropdown when clicking outside it or pressing Escape
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    return (
        <header className="flex px-4 py-3 justify-between">
            <div className="flex items-center gap-4 z-50">
                <Image
                    src="/images/scc_logo.svg"
                    alt="Southampton City Council Logo"
                    width={150}
                    height={150}
                    style={{ height: "auto" }}
                    priority
                    unoptimized
                />
                <h1 className="text-4xl">Triage Lookup System</h1>
            </div>

            <div className="flex items-center gap-4 z-50">
                {status === "loading" ? null : session ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setOpen((o) => !o)}
                            aria-haspopup="menu"
                            aria-expanded={open}
                            className="flex items-center gap-2 text-2xl pr-5 py-3 cursor-pointer"
                        >
                            {session.user.email}
                            <span className={`text-sm transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
                        </button>

                        {open && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-56 bg-white border-2 rounded-[5px] shadow-lg flex flex-col overflow-hidden"
                            >
                                <button
                                    role="menuitem"
                                    onClick={() => {
                                        setOpen(false);
                                        router.push("/");
                                    }}
                                    className="px-4 py-3 text-left hover:bg-amber-200 cursor-pointer"
                                >
                                    VIEW COMPLAINTS
                                </button>
                                <div className="border-t border-gray-300" />
                                <button
                                    role="menuitem"
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                    className="px-4 py-3 text-left hover:bg-amber-200 cursor-pointer"
                                >
                                    SIGN OUT
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => router.push("/login")} className="text-4xl pr-5 cursor-pointer">
                        LOGIN
                    </button>
                )}
            </div>
        </header>
    );
}