"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const userSession = useSession();
    console.log(userSession)

    return (
        <SessionProvider>
        <nav className="w-full h-auto py-4 px-10 flex justify-between items-center">
           <div className="">nextSound</div> 
           <ul className="list-none flex justify-center space-x-6 items-center">
            {userSession.data?.user && 
            <>
            <li className="flex justify-center space-x-1 items-center">
               <Image className="rounded-full w-8 h-8" priority src={userSession.data.user.image!} alt={userSession.data.user.name!} width={200} height={200}/>
               <span>{userSession.data.user.name}</span>
            </li>
            <li>
                <button type="button" onClick={() => signOut()}>Logout</button>
            </li>
            </>}
            {!userSession.data?.user && <li>
                <button type="button" onClick={() => signIn()}>Login</button>
            </li>}
           </ul>
        </nav>
        </SessionProvider>
    )
}