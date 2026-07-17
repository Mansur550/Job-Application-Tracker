'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";


export default function HeroImage() {
    const [activeTab, setActiveTab] = useState("organize");
    return <>
        <section className="border-t  bg-white py-16">
            <div className=" container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    {/* Tabs */}
                    <div className="flex gap-4 justify-center mb-8">
                        <Button 
                        onClick={() => setActiveTab("organize")}
                        className={''}
                        >Organize Application</Button>
                        <Button onClick={() => setActiveTab("hired")}>Get Hired</Button>
                        <Button onClick={() => setActiveTab("board")}>Manage Boards</Button>
                    </div>
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border-gray-200 shadow-xl">

                        {activeTab === "organize" && <Image
                            src="/hero-images/hero1.png"
                            alt="Organize Applications"
                            width={1200}
                            height={800}
                        />}

                        {activeTab === "hired" && <Image
                            src="/hero-images/hero2.png"
                            alt="Get Heried"
                            width={1200}
                            height={800}
                        />}

                        {activeTab === "board" && <Image
                            src="/hero-images/hero3.png"
                            alt="Manage board"
                            width={1200}
                            height={800}
                        />}
                    </div>
                </div>
            </div>

        </section>

    </>
}