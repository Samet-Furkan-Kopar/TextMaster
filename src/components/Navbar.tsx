"use client";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import { getSession, logout } from "@/actions/sessionAction";

const Navbar = () => {
    const router = useRouter();
    const [session, setSession] = useState("");

    const handleLogOut = async () => {
        await logout();
        getSession().then((res: any) => {
            setSession(res);
        });
    };

    useEffect(() => {
        getSession().then((res: any) => {
            setSession(res);
          
        });
    }, []);

    useEffect(()=>{
        console.log(session)
    },[session])

    return (
        <div className="bg-[#1C1F2E] h-16 flex flex-row justify-between items-center">
            <div
                className="text-white ml-14 font-extrabold text-xl cursor-pointer"
                onClick={() => {
                    router.push("/");
                }}
            >
                TextMaster
            </div>
            <div className="flex ">
                {session?.isLoggedIn ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full border-none mr-14 ">
                        <Avatar>
  <AvatarImage src={session.image_url} />
  <AvatarFallback>{session.username.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel className="cursor-pointer">
                                {session?.username}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="cursor-pointer" />
                            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div
                        onClick={() => {
                            router.push("/login");
                        }}
                        className="cursor-pointer flex h-9 bg-[#9a22f0] text-center items-center mr-14 px-3 rounded-md text-white font-semibold"
                    >
                        LogIn
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
