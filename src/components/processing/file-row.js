import React, { useState } from "react";
import ImageLogo from "./image-icon.svg";
import CloseIcon from "./close.svg";
const OPTIONS = ["JPG", "PNG"];
const FileRow = (props) => {
  const [option, setOption] = useState("JPG");
  const file = props.file;
  function humanFileSize(size) {
    var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  }
  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-row h-[70px] items-center justify-around">
      <img src={ImageLogo} alt="logo" />
      <p>{file.name}</p>
      <p className="text-[#8E8E8E] text-sm">{humanFileSize(file.size)}</p>
      <select
        value={option}
        onChange={handleOptionChange}
        className="bg-transparent w-[100px] h-[40px] px-2 border-gray-300 border-2 rounded-md"
      >
        {OPTIONS.map((option, index) => {
          return (
            <option key={`option-${index}`} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <button className="bg-transparent w-[50px] h-[40px] px-2 border-gray-300 border-2 rounded-md font-extrabold">
        ...
      </button>
      <button className="bg-black w-[100px] h-[40px] px-2 rounded-md text-[#215FF6] font-bold text-lg">
        Start
      </button>
      <img
        src={CloseIcon}
        alt="logo"
        className="w-[40px] h-[40px] cursor-pointer"
        width={40}
        height={40}
        style={{ width: 25, height: 25 }}
      />
    </div>
  );
};

export default FileRow;
