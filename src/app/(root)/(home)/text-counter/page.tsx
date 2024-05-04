"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useToast } from "@/components/ui/use-toast";
const page = () => {
    const [value, setValue] = useState("");
    const [countLetter, setCountLetter] = useState(0);
    const [countWord, setCountWord] = useState(0);
    const [countSentence, setCountSentence] = useState(0);
    const [countCharacter, setCountCharacter] = useState<number>(0);
    const [error, setError] = useState(false)
    const { toast } = useToast();

    const counterWord = (text: string) => {
        console.log(text.length);
        
        if (text.length > 2400) {
            setError(true)
            toast({ title: "You have reached the maximum character limit"});
            setValue(text.slice(0, 2400));
        } else {
            const textValue = text.toLowerCase();
            const letterCount = textValue.replace(/[^a-z]/g, "").length;
            const cleanedText = text.replace(/[^\w\s]/gi, "");
            const wordsCount = cleanedText.trim().split(/\s+/).length;
            const sentencesCount = text.split(/[.?!;]/).length - 1;
            setCountSentence(sentencesCount);
            setCountLetter(letterCount);
            setCountWord(wordsCount);
            setCountCharacter(text.length);
        }
    };
    useEffect(() => {
        counterWord(value);
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            {/* <div className="flex flex-col items-center justify-center mt-5 gap-3"> */}
            <h1 className="text-4xl font-extrabold text-sky-1 lg:text-7xl my-7">Text Counter</h1>
            <div className=" bg-slate-300 xl:w-[800px] min-w-[300px] min-h-[450px] p-2">
                <div className="grid max-md:grid-cols-2 grid-cols-4">
                    <div className="flex items-center justify-center">
                        <h1 className="md:text-xl text-sm font-extrabold">Total Character: </h1>
                        <p className="md:text-xl text-sm text-[#1C1E20]">{countCharacter}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <h1 className="md:text-xl text-sm font-extrabold">Total Letter: </h1>
                        <p className="md:text-xl text-sm text-[#1C1E20]">{countLetter}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <h1 className="md:text-xl text-sm font-extrabold">Total Word: </h1>
                        <p className="md:text-xl text-sm text-[#1C1E20]">{countWord}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <h1 className="md:text-xl text-sm font-extrabold">Total Sentence: </h1>
                        <p className="md:text-xl text-sm text-[#1C1E20]">{countSentence}</p>
                    </div>
                </div>
                <TextField
                    id="filled-multiline-static"
                    label="Paste text"
                    multiline
                    fullWidth
                    rows={16}
                    sx={{ backgroundColor: error ? "error" :""}}
                    // defaultValue="Default Value"
                    variant="filled"
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
        // </div>
    );
};
export default page;
