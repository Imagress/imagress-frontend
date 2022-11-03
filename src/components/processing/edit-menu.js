import React, { useState } from "react";

const EditMenu = (props) => {
  const [options, setOptions] = useState({
    file: props.file,
  });
  return (
    <div className="w-[320px] h-[320px] bg-[#215FF6] rounded-lg text-white px-5 py-2 shadow-lg border-[1px] border-white flex flex-col gap-4 justify-center">
      <div className="flex flex-row gap-3 items-center">
        <InputBox type="number" id="width" text="Width" />
        <InputBox type="number" id="height" text="Height" />
      </div>
      <CheckBoxMenu id="flipx" text="Flip image horizontally" />
      <CheckBoxMenu id="flipy" text="Flip image vertically" />
      <InputBox type="number" id="rotate" text="Rotation" />
      <button className="w-[100px] h-[30px] bg-white text-black font-bold rounded-xl self-center">Done</button>
    </div>
  );
};

const InputBox = (props) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <label htmlFor={props.id}>{props.text}</label>
      <input
        type={props.type}
        id={props.id}
        className="w-[60px] h-[45px] text-black rounded-md focus:border-0 bg-[#D9D9D9] appearance-none px-2"
      />
    </div>
  );
};

const CheckBoxMenu = (props) => {
  return (
    <div className="flex flex-row gap-4">
      <input
        type="checkbox"
        id={props.id}
        className="w-[30px] h-[30px] bg-[#D9D9D9] accent-[#040F35] rounded-lg focus:ring-0 ring-0 text-[#040F35]"
      />
      <label htmlFor={props.id}>{props.text}</label>
    </div>
  );
};

export default EditMenu;
