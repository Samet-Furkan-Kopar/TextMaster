import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";

type OptionProps = {
    continuous: boolean;
    lang: string;
};

const useSpeechToText = (options?: OptionProps) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recgonitionRef = useRef(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            toast({ title: "Browser not supported" });
            return;
        }
        recgonitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recgonitionRef.current;
        recognition.interimResults = options.interimResults || true;
        console.log("options", options?.lang);
        recognition.lang = options.lang || "tr-TR";
        recognition.continuous = options.continuous || false;

        if ("webkitSpeechGrammerList" in window) {
            const grammer =
                "#JSGF V1.0; grammer punctuation; public <punc> = . | , | ? | ! | ; | : ;";
            const speechRecognitionList = new window.webkitSpeechGrammerList();
            speechRecognitionList.addFromString(grammer, 1);
            recognition.grammers = speechRecognitionList;
        }
        recognition.onresult = (event) => {
            let text = "";
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        };
        recognition.onerror = (event) => {
            console.log("Error in recognition: ", event.error);
        };
        recognition.onend = () => {
            setIsListening(false);
            setTranscript("");
        };
        return () => {
            recognition.stop();
        };
    }, [options?.lang]);

    const startListening = () => {
        if (recgonitionRef.current && !isListening) {
            recgonitionRef.current.start();
            setIsListening(true);
        }
    };
    const stopListening = () => {
        if (recgonitionRef.current && isListening) {
            recgonitionRef.current.stop();
            setIsListening(false);
        }
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
    };
};

export default useSpeechToText;
