"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoCopyOutline } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const { toast } = useToast();

  // eng  tur chi_sim chi_tra hin ita spa deu
  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    console.log("data");
    const worker = await createWorker("tur");
    console.log("worker");
    const { data } = await worker.recognize(selectedImage);
    console.log("data");
    setTextResult(data.text);
    console.log(data.text);
  }, [selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const copyText = () => {
    if (textResult) {
      navigator.clipboard.writeText(textResult);
      toast({ title: "Text Copied." });
    }
  };

  return (
    <div className="flex flex-row gap-5 items-center justify-center mx-auto mt-8">
      <Card className="flex flex-col w-1/2 min-h-[450px] bg-slate-100">
        <CardHeader className="flex flex-row space-y-0 justify-between items-center">
          <CardTitle className="flex text-center">Image Upload</CardTitle>
          <Button
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<CloudUploadIcon color="black" />}
            onChange={handleChangeImage}
          >
            <VisuallyHiddenInput type="file" />
          </Button>
        </CardHeader>
        {selectedImage && (
          <div className="box-image">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="thumb"
              className="w-full"
            />
          </div>
        )}
      </Card>

      <Card className="flex flex-col w-1/2 h-[450px] bg-slate-100">
        <CardHeader className="flex flex-row space-y-0 justify-between items-center">
          <CardTitle className="flex text-center">Text Result</CardTitle>
          <div className="flex flex-row gap-1">
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
        <CardContent>
          {textResult && (
            <p className="overflow-y-auto h-80 text-sm">{textResult}</p>
          )}
          {!textResult && selectedImage && (
            <div className="flex items-center justify-center h-80 w-full">
              <Image
                src="/icons/loading-circle.svg"
                alt="Loading"
                width={50}
                height={50}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
