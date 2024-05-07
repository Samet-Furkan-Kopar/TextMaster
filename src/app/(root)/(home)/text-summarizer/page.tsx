"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoCopyOutline } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { createWorker } from "tesseract.js";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import { Tooltip } from "@mui/material";
import { FaRegFileWord } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { saveAs } from "file-saver";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const TextSummary = () => {
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState("");
  const { toast } = useToast();
  const [isPost, setIsPost] = useState(false);
  const rates = ["0.4", "0.5", "0.6", "0.7", "0.8"];
  const [rate, setRate] = useState("");

  const postData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8800/api/v1/text/summarization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }), // Veriyi JSON formatına dönüştür
        }
      );
      if (!response.ok) {
        setIsPost(false);
        throw new Error("Network response was not ok");
      }
      setIsPost(false);
      const responseData = await response.json();
      setTextResult(responseData.data[0].summary_text);
    } catch (error) {
      setIsPost(false);
      console.error("There was a problem with your fetch operation:", error);
      throw error;
    }
  };

  const handleDone = async () => {
    if (text.length < 100) {
      toast({ title: "Text Length < 100" });
    } else {
      setIsPost(true);
      await postData();
    }
  };

  const downloadWord = () => {
    const blob = new Blob([textResult], { type: "application/msword" });
    saveAs(blob, "speech_text.doc");
  };
  const copyText = () => {
    if (textResult) {
      navigator.clipboard.writeText(textResult);
      toast({ title: "Text Copied." });
    } else {
      toast({ title: "No text yet." });
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.addFont("fonts/Roboto-Medium.ttf", "TurkishFont", "normal");
    pdf.setFont("TurkishFont");
    pdf.text(textResult, 20, 25);
    const pdfData = pdf.output();
    const blob = new Blob([pdfData], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  };

  useEffect(() => {
    console.log("rate", rate);
  }, [rate]);
  console.log("rate", rate);

  return (
    <div className="flex flex-row gap-5 items-center justify-center mx-auto mt-8">
      <Card className="flex flex-col w-1/2 min-h-[450px] bg-slate-100">
        <CardHeader className="flex flex-row space-y-0 justify-between items-center h-1/5">
          <CardTitle className="flex text-center">Text Input</CardTitle>
          <div className="flex">
            <Select onValueChange={(value)=> setRate(value)}>
              <SelectTrigger className="w-[130px] bg-slate-50">
                <SelectValue placeholder="Select a rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {rates.map((iconItem, key) => {
                    return (
                      <SelectItem
                        value={iconItem}
                        // onChange={(e) => setRate(e.target.value) }
                        key={key}
                      >
                        {iconItem}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              startIcon={<AiOutlineDelete size={25} color="black" />}
              onClick={() => {
                setText("");
              }}
            ></Button>
          </div>
        </CardHeader>
        <div className="h-[350px] w-full flex flex-col gap-2 ">
          <Textarea
            placeholder="Type your message here. Just English."
            className="resize-none h-[90%] w-[96%] mx-auto bg-slate-100 "
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button
            className="h-[10%] w-full"
            sx={{ color: "black" }}
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col w-1/2 h-[450px] bg-slate-100">
        <CardHeader className="flex flex-row space-y-0 justify-between items-center">
          <CardTitle className="flex text-center">Summary</CardTitle>
          <div className="flex flex-row gap-1">
            <Tooltip title="Download as Pdf">
              <Button
                variant="text"
                tabIndex={-1}
                startIcon={<BsFiletypePdf size={25} color="black" />}
                onClick={() => {
                  if (textResult) {
                    downloadPDF();
                  } else {
                    toast({ title: "No text yet." });
                  }
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Download as Word">
              <Button
                variant="text"
                tabIndex={-1}
                startIcon={<FaRegFileWord size={25} color="black" />}
                onClick={() => {
                  if (textResult) {
                    downloadWord();
                  } else {
                    toast({ title: "No text yet." });
                  }
                }}
              />
            </Tooltip>
            <Tooltip title="Copy Text">
              <Button
                variant="text"
                tabIndex={-1}
                startIcon={<IoCopyOutline size={25} color="black" />}
                onClick={copyText}
              ></Button>
            </Tooltip>
          </div>
        </CardHeader>
        <div className="h-[350px]">
          {textResult ? (
            <Textarea
              placeholder="Type your message here."
              className="resize-none h-[90%] w-[96%] mx-auto bg-slate-100 "
              value={textResult}
              onChange={(e) => {
                setTextResult(e.target.value);
              }}
            />
          ) : null}
          {isPost ? (
            <div className="flex items-center justify-center h-80 w-full">
              <Image
                src="/icons/loading-circle.svg"
                alt="Loading"
                width={50}
                height={50}
              />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default TextSummary;
