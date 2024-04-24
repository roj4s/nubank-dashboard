"use client";
import React, { useEffect, useState } from "react";
import InputFileUpload from "./uploadbtn";

type Props = {
  inactiveText?: string;
  activeText?: string;
  onUpload?: (files: File[]) => void;
};

const Dropzone = ({ activeText, inactiveText, onUpload }: Props) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleFiles = (files: File[]) => {
    if (onUpload) {
      return onUpload(files);
    }
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  return (
    <div
      className={`flex justify-center flex-col items-center border-2 border-dashed rounded-lg p-5
        ${isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"} gap-4`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p
        className={`text-sm ${
          isDragActive ? "text-sky-800" : "text-gray-400"
        }  `}
      >
        {isDragActive
          ? activeText || "Leave Your File Here"
          : inactiveText || "Drag and drop your files here"}
      </p>
      <InputFileUpload onUpload={handleFiles} />
    </div>
  );
};

export default Dropzone;
