import React, { useState } from "react";
import FlipHorizontalIcon from "../../svg/flip-horizontal.svg";
import FlipVerticalIcon from "../../svg/flip-vertical.svg";
import ResizeIcon from "../../svg/resize.svg";
import SharpenIcon from "../../svg/sharpen.svg";
import MedianIcon from "../../svg/median.svg";
import BlurIcon from "../../svg/blur.svg";
import FlattenIcon from "../../svg/flatten.svg";
import NegateIcon from "../../svg/negate.svg";
import NormalizeIcon from "../../svg/normalize.svg";
import TintIcon from "../../svg/tint.svg";
import GrayscaleIcon from "../../svg/grayscale.svg";
import FlipHorizontalDisabledIcon from "../../svg/flip-horizontal-disabled.svg";
import FlipVerticalDisabledIcon from "../../svg/flip-vertical-disabled.svg";
import ResizeDisabledIcon from "../../svg/resize-disabled.svg";
import SharpenDisabledIcon from "../../svg/sharpen-disabled.svg";
import MedianDisabledIcon from "../../svg/median-disabled.svg";
import BlurDisabledIcon from "../../svg/blur-disabled.svg";
import FlattenDisabledIcon from "../../svg/flatten-disabled.svg";
import NegateDisabledIcon from "../../svg/negate-disabled.svg";
import NormalizeDisabledIcon from "../../svg/normalize-disabled.svg";
import TintDisabledIcon from "../../svg/tint-disabled.svg";
import GrayscaleDisabledIcon from "../../svg/grayscale-disabled.svg";

const EditMenu = (props) => {
  const [options, setOptions] = useState({
    file: props.file,
    flipHorizontal: false,
    flipVertical: false,
    resize: { width: null, height: null },
    sharpen: 0,
    median: false,
    blur: 0,
    flatten: false,
    negate: false,
    normalize: false,
    tint: { r: 0, g: 0, b: 0 },
    greyscale: false,
  });

  const [showMenu, setShowMenu] = useState({
    resize: false,
    sharpen: false,
    blur: false,
    tint: false,
  });

  const handleResizeChange = (e) => {
    // console.log("resize");
    // console.log(`${e.target.id} ${e.target.value}`);
    let val = e.target.value;
    let tmp = { ...options };
    switch (e.target.id) {
      case "width":
        tmp.resize.width = val;
        break;
      case "height":
        tmp.resize.height = val;
        break;
      default:
        break;
    }
    setOptions(tmp);
  };

  const handleSliderChange = (e) => {
    // console.log(e.target.value);
    let val = e.target.value;
    let tmp = { ...options };
    switch (e.target.id) {
      case "sharpen":
        tmp.sharpen = val;
        break;
      default:
        break;
    }
    setOptions(tmp);
  };

  return (
    <div className="w-[800px] h-[60px] bg-[#215FF6] rounded-lg text-white px-5 py-2 shadow-lg border-[1px] border-white flex flex-row gap-4 justify-between relative">
      {/* <div className="flex flex-row gap-3 items-center">
        <InputBox type="number" id="width" text="Width" />
        <InputBox type="number" id="height" text="Height" />
      </div>
      <CheckBoxMenu id="flipx" text="Flip image horizontally" />
      <CheckBoxMenu id="flipy" text="Flip image vertically" />
      <InputBox type="number" id="rotate" text="Rotation" />
      <button className="w-[100px] h-[30px] bg-white text-black font-bold rounded-xl self-center">Done</button> */}
      <IconMenuButton
        icon={
          options.flipHorizontal
            ? FlipHorizontalIcon
            : FlipHorizontalDisabledIcon
        }
        alt="flipHorizontal"
        onClick={() => {
          let tmp = { ...options };
          tmp.flipHorizontal = !tmp.flipHorizontal;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={
          options.flipVertical ? FlipVerticalIcon : FlipVerticalDisabledIcon
        }
        alt="flipVertical"
        onClick={() => {
          let tmp = { ...options };
          tmp.flipVertical = !tmp.flipVertical;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={
          options.resize.width || options.resize.height
            ? ResizeIcon
            : ResizeDisabledIcon
        }
        alt="resize"
        onClick={() => {
          let showTmp = { ...showMenu };
          showTmp.resize = !showTmp.resize;
          setShowMenu(showTmp);
        }}
      />
      <IconMenuButton
        icon={options.sharpen > 0 ? SharpenIcon : SharpenDisabledIcon}
        alt="sharpen"
        onClick={() => {
          let tmp = { ...showMenu };
          tmp.sharpen = !tmp.sharpen;
          setShowMenu(tmp);
        }}
      />
      <IconMenuButton
        icon={options.median ? MedianIcon : MedianDisabledIcon}
        alt="median"
        onClick={() => {
          let tmp = { ...options };
          tmp.median = !tmp.median;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={options.blur > 0 ? BlurIcon : BlurDisabledIcon}
        alt="blur"
      />
      <IconMenuButton
        icon={options.flatten ? FlattenIcon : FlattenDisabledIcon}
        alt="flatten"
        onClick={() => {
          let tmp = { ...options };
          tmp.flatten = !tmp.flatten;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={options.negate ? NegateIcon : NegateDisabledIcon}
        alt="negate"
        onClick={() => {
          let tmp = { ...options };
          tmp.negate = !tmp.negate;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={options.normalize ? NormalizeIcon : NormalizeDisabledIcon}
        alt="normalize"
        onClick={() => {
          let tmp = { ...options };
          tmp.normalize = !tmp.normalize;
          setOptions(tmp);
        }}
      />
      <IconMenuButton
        icon={
          options.tint.r > 0 || options.tint.g > 0 || options.tint.b > 0
            ? TintIcon
            : TintDisabledIcon
        }
        alt="tint"
      />
      <IconMenuButton
        icon={options.greyscale ? GrayscaleIcon : GrayscaleDisabledIcon}
        alt="grayscale"
        onClick={() => {
          let tmp = { ...options };
          tmp.greyscale = !tmp.greyscale;
          setOptions(tmp);
        }}
      />
      {showMenu.resize && (
        <div className="absolute top-16 left-20">
          <ResizeMenu
            onChange={handleResizeChange}
            wVal={options.resize.width}
            hVal={options.resize.height}
          />
        </div>
      )}
      {showMenu.sharpen && (
        <div className="absolute top-16 left-40 bg-[#215FF6] w-[200px] h-[40px] justify-center items-center flex rounded-xl">
          <SliderMenu
            min={0}
            max={100}
            value={options.sharpen}
            onChange={handleSliderChange}
            id="sharpen"
          />
        </div>
      )}
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
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

const SliderMenu = (props) => {
  return (
    <div className="flex flex-row gap-3 items-center accent-[#040F35]">
      {/* <label htmlFor={props.id}>{props.text}</label> */}
      <input
        type="range"
        min={props.min ?? 0}
        max={props.max ?? 100}
        id={props.id}
        // className="w-[60px] h-[45px] text-black rounded-md focus:border-0 bg-[#D9D9D9] appearance-none px-2"
        onChange={props.onChange}
        value={props.value}
      />
      <p>{props.value}</p>
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

const IconMenuButton = (props) => {
  return (
    <img
      src={props.icon}
      alt={props.alt}
      width={40}
      height={40}
      className="w-[40px] h-[40px] cursor-pointer"
      onClick={props.onClick}
    />
  );
};

const ResizeMenu = (props) => {
  return (
    <div className="w-[200px] h-[120px] bg-[#215FF6] flex flex-col gap-3 items-center justify-center rounded-xl">
      <InputBox
        type="number"
        id="width"
        text="Width"
        onChange={props.onChange}
        value={props.wVal}
      />
      <InputBox
        type="number"
        id="height"
        text="Height"
        onChange={props.onChange}
        value={props.hVal}
      />
    </div>
  );
};

export default EditMenu;
