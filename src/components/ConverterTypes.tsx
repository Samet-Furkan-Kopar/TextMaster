"use client";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

type MeetingTypeListProps = {
    setLoading: (loading: boolean) => void;
};

const MeetingTypeList = ({ setLoading}:MeetingTypeListProps) => {
    const router = useRouter();
    const { toast } = useToast();
    

    const handleRoute = (route:string)=>{
        setLoading(true); // Yüklenme başladı
        
        new Promise(() => {
            router.push(`${route}`);
        }).finally(() => {
            setLoading(false); // Yönlendirme tamamlandı, yüklenme durumu kapatıldı
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
        >
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mt-5 ">
                <Tilt
                    options={{
                        max: 20,
                        scale: 1,
                        speed: 450,
                    }}
                >
                    <HomeCard
                        icon="CiTextAlignLeft"
                        title="Text Converter"
                        description="Calculate the number of letters, words and sentences in the text"
                        handleClick={() => {
                            router.push("/text-counter");
                        }}
                        className="bg-orange-1"
                    />
                </Tilt>
                <Tilt
                    options={{
                        max: 20,
                        scale: 1,
                        speed: 450,
                    }}
                >
                    <HomeCard
                        icon="PiUserSound"
                        title="Speech to Text"
                        description="Convert your speech to text"
                        handleClick={() => {
                            handleRoute("/speech-to-text");
                        }}
                        className="bg-blue-1"
                    />
                </Tilt>
                <Tilt
                    options={{
                        max: 20,
                        scale: 1,
                        speed: 450,
                    }}
                >
                    <HomeCard
                        icon="FaRegImages"
                        title="Image to Text"
                        description="Convert the text in the image to text"
                        handleClick={() => {
                            handleRoute("/image-to-text");
                        }}
                        className="bg-yellow-1"
                    />
                </Tilt>
                <Tilt
                    options={{
                        max: 20,
                        scale: 1,
                        speed: 450,
                    }}
                >
                    <HomeCard
                        icon="ImCopy"
                        title="Text Summary"
                        description="Summarize your text"
                        handleClick={() => {
                            handleRoute("/text-summarizer");
                        }}
                        className="bg-purple-1"
                    />
                </Tilt>
            </section>
        </motion.div>
    );
};

export default MeetingTypeList;
