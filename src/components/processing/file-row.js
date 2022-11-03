import React, { useState } from "react";
import CloseIcon from "./close.svg";
import FileLogo from "../../svg/file.svg";
import EditMenu from "./edit-menu";
const OPTIONS = ["JPEG", "PNG", "GIF", "TIFF", "WEBP"];
const FileRow = (props) => {
  const [option, setOption] = useState("...");
  const [popup, setPopup] = useState(false);
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
    <div className="flex flex-row h-[70px] items-center justify-around bg-[#215FF6] rounded-xl text-white">
      <img src={FileLogo} alt="logo" className="w-[50px]" />
      <div className="whitespace-pre-line">
        <div className="w-64 text-ellipsis flex flex-row">
          <span className="truncate ...">{file.name.split(".")[0]}</span>
          <span>{`.${file.type.split("/")[1]}`}</span>
        </div>
        {/* <span>{`.${file.type.split("/")[1]}`}</span> */}
      </div>
      {/* <p className="text-[#8E8E8E] text-sm text-center w-16">
        {humanFileSize(file.size)}
      </p> */}
      <div className="flex flex-row justify-center items-center gap-2">
        <p>Convert To</p>
        <select
          // defaultValue={"..."}
          value={option}
          onChange={handleOptionChange}
          className="bg-white text-black w-[100px] h-[50px] px-2 rounded-md"
        >
          <option disabled value={"..."} className="hidden">
            ...
          </option>
          {OPTIONS.map((option, index) => {
            return (
              <option key={`option-${index}`} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative">
        <button
          className="bg-white text-black w-[100px] h-[50px] px-2 rounded-md"
          onClick={() => {
            setPopup(!popup);
          }}
        >
          Edit
        </button>
        {popup && (
          <div className="absolute top-16 -left-[110px] z-50">
            <EditMenu file={file} />
          </div>
        )}
      </div>
      {/* <button className="bg-black w-[100px] h-[40px] px-2 rounded-md text-[#215FF6] font-bold text-lg">
        Start
      </button> */}
      <button className="w-[150px] h-[50px] text-black bg-white rounded-lg">
        Done
      </button>
      <img
        src={CloseIcon}
        alt="logo"
        className="w-[40px] h-[40px] cursor-pointer"
        width={40}
        height={40}
        style={{ width: 25, height: 25 }}
        onClick={() => {
          setPopup(false);
          props.onRemove(file);
        }}
      />
    </div>
  );
};

export default FileRow;
