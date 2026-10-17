"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function navbar() {
    const router = useRouter();
    return (
        <header className="flex px-4 justify-between">
            <div className="flex items-center gap-4 z-50">
                <Image src="/images/scc_logo.svg" alt={"Southampton City Council Logo"} width={150} height={150} unoptimized></Image>
                <h1>Triage Lookup System</h1>
            </div>
            <div className="flex items-center gap-4 z-50">
                <button onClick={() => router.push("/login")}>Hi I am Button</button>
            </div>
        </header>
    );
}