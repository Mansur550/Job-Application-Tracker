"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession, signOut } from "@/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";


export default  function Navbar() {

    // const session = await getSession();
    const { data: session } = useSession();
    return <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary ">
                <Briefcase />
                Job Traker
            </Link>
            {/* Log In */}
            <div className="flex items-center gap-4">
                {session?.user ? (
                    <>
                        <Link href="/dashboard">
                            <Button
                                variant="ghost"
                                className="text-gray-700 hover:text-black"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button variant="ghost" size="icon">
                                        <Avatar>
                                            <AvatarFallback className="bg-primary text-white font-bold">
                                                {session.user.name[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                }
                            />

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <SignOutButton/>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Link href="sign-in" >
                            <Button variant="ghost" className="text-gray-999 hover:text-white hover:bg-gray-500">
                                Log In
                            </Button>
                        </Link>

                        <Link href="sign-up">
                            <Button className="bg-primary hover:bg-primary/80">Start for free</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    </nav>
}