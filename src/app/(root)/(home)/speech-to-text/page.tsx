"use client";
import useSpeechToText from "@/components/useSpeechToText";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
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

    return (
        <div className="flex items-center justify-center my-8">
            <Card className="flex flex-col w-1/2 h-[500px] bg-slate-100 min-w-[250px]">
                <CardHeader className="flex flex-row space-y-0 justify-between items-center">
                    <CardTitle className="flex text-center">
                        {!isListening ? "Mic is Off" : "Mic is On"}
                    </CardTitle>
                    <div className="flex flex-row gap-1">
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Language</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label="Language"
                                value={lang}
                                onChange={handleChange}
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
                        <Button
                            variant="text"
                            tabIndex={-1}
                            startIcon={<BsFiletypePdf size={25} color="black" />}
                        ></Button>
                        <Button
                            variant="text"
                            tabIndex={-1}
                            startIcon={<IoCopyOutline size={25} color="black" />}
                            onClick={copyText}
                        ></Button>
                    </div>
                </CardHeader>
                <CardContent className="relative">
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        fullWidth
                        rows={16}
                        disabled={isListening}
                        sx={{
                            backgroundColor: "#F1F5F9" ,
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
                        className="absolute left-[50%] bottom-[20%]"
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
