"use client";
import useSpeechToText from "@/components/useSpeechToText";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { BsFiletypePdf } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { FaRegFileWord } from "react-icons/fa";

const SpeechToText = () => {
    const [textInput, setTextInput] = useState("");
    const [lang, setLang] = useState("");
    const { toast } = useToast();
    const { isListening, startListening, stopListening, transcript } = useSpeechToText({
        continuous: true,
        lang: lang,
    });

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening();
    };

    const stopVoiceInput = () => {
        setTextInput(
            (prevVal) =>
                prevVal + (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
        );
        stopListening();
    };

    const handleChange = (event) => {
        setLang(event.target.value);
    };

    const copyText = () => {
        if (textInput) {
            navigator.clipboard.writeText(textInput);
            toast({ title: "Text Copied." });
        }
    };
    const downloadPDF = () => {
        const pdf = new jsPDF();
        pdf.addFont("fonts/Roboto-Medium.ttf", "TurkishFont", "normal");
        pdf.setFont("TurkishFont");
        pdf.text(textInput, 20, 25);
        const pdfData = pdf.output();
        const blob = new Blob([pdfData], { type: "application/pdf" });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
    };
    const downloadWord = () => {
        const blob = new Blob([textInput], { type: "application/msword" });
        saveAs(blob, "speech_text.doc");
    };

    return (
        <div className="flex items-center justify-center my-8">
            <Card className="flex flex-col w-1/2 h-screen max-h-[600px] bg-slate-100 min-w-[250px] md:gap-6">
                <CardHeader className="flex flex-row space-y-0 justify-between items-center gap-1" >
                    <CardTitle className="flex text-center max-md:text-sm">
                        {!isListening ? "Mic is Off" : "Mic is On"}
                    </CardTitle>
                    <div className="flex items-center justify-between md:gap-5">
                        <FormControl className="w-[120px] max-md:w-[80px] " size="small">
                            <InputLabel id="demo-select-small-label">Language</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Language"
                                value={lang}
                                onChange={handleChange}
                                className="max-md:text-sm"
                            >
                                <MenuItem value={lang}></MenuItem>
                                <MenuItem value="tr-TR">Türkçe</MenuItem>
                                <MenuItem value="en-US">English</MenuItem>
                                <MenuItem value="ar-SA">العربية</MenuItem>
                                <MenuItem value="it-IT">Italiano</MenuItem>
                                <MenuItem value="hi-IN">हिन्दी</MenuItem>
                                <MenuItem value="zh-CN">中文</MenuItem>
                                <MenuItem value="de-DE">Deutsch</MenuItem>
                                <MenuItem value="fr-FR">Français</MenuItem>
                            </Select>
                        </FormControl>
                       <div className="flex max-md:flex-col justify-between gap-0">
                       <Tooltip title="Download as PDF">
                            <Button
                                variant="text"
                                tabIndex={-1}
                                sx={{ m:0 }}
                                startIcon={<BsFiletypePdf className="size-[30px] max-md:size-[20px]" color="black" />}
                                onClick={() => {
                                    if (textInput) {
                                        downloadPDF();
                                    } else {
                                        toast({ title: "No text yet" });
                                    }
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Download as Word">
                            <Button
                                variant="text"
                                tabIndex={-1}
                                startIcon={<FaRegFileWord className="size-[30px] max-md:size-[20px]" color="black" />}
                                onClick={() => {
                                    if (textInput) {
                                        downloadWord();
                                    } else {
                                        toast({ title: "No text yet" });
                                    }
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Copy Text">
                        <Button
                            variant="text"
                            tabIndex={-1}
                            startIcon={<IoCopyOutline className="size-[30px] max-md:size-[20px]"  color="black" />}
                            onClick={copyText}
                        />
                        </Tooltip>
                       </div>
                    </div>
                </CardHeader>
                <CardContent className="relative p-0 " >
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        fullWidth
                        rows={18}
                        disabled={isListening}
                        // className="mt-5"
                        sx={{
                            backgroundColor: "#F1F5F9",
                            border: "none",
                        }}
                        value={
                            isListening
                                ? textInput +
                                  (transcript.length
                                      ? (textInput.length ? " " : "") + transcript
                                      : "")
                                : textInput
                        }
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <Button
                        className="absolute left-[calc(50%-35px)] bottom-[20%]"
                        variant="text"
                        tabIndex={-1}
                        startIcon={
                            isListening ? (
                                <FaMicrophoneAlt size={35} color="green" />
                            ) : (
                                <FaMicrophoneAltSlash size={35} color="red" />
                            )
                        }
                        onClick={() => startStopListening()}
                    ></Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SpeechToText;
