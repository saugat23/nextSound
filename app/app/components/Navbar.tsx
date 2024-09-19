"use client"
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const userSession = useSession();
    console.log(userSession)

    return (
        <SessionProvider>
        <header className="px-4 lg:px-6 h-14 flex justify-between w-full items-center max-w-[1200px] mx-auto">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 mr-2" />
          <span className="font-bold">NextSound</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {userSession.data?.user && 
            <>
            <span className="flex justify-center space-x-1 items-center">
               <Image className="rounded-full w-5 h-5" priority src={userSession.data.user.image!} alt={userSession.data.user.name!} width={200} height={200}/>
               <span className="text-base">{userSession.data.user.name}</span>
            </span>
            <span>
                <Button type="button" onClick={() => signOut()}>Logout</Button>
            </span>
            </>}
          {!userSession.data?.user && <span>
                <Button type="button" onClick={() => signIn()}>Login</Button>
            </span>}
        </nav>
      </header>
        </SessionProvider>
    )
}