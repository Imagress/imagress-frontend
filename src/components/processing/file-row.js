import React, { useState, useEffect } from "react";
import CloseIcon from "./close.svg";
import FileLogo from "../../svg/file.svg";
import EditMenu from "./edit-menu";
import convertAPI from "../../utils/api";
import { ThreeCircles } from "react-loader-spinner";
import download from "downloadjs";
const OPTIONS = ["JPEG", "PNG", "GIF", "TIFF", "WEBP"];
const FileRow = (props) => {
  const [fileFormatOption, setOption] = useState("...");
  const [popup, setPopup] = useState(false);
  const [processOptions, setProcessOptions] = useState({
    file: props.file,
    flipHorizontal: false,
    flipVertical: false,
    resize: { width: 0, height: 0 },
    sharpen: 0,
    median: 0,
    blur: 0,
    flatten: "",
    negate: false,
    normalize: false,
    tint: { r: 0, g: 0, b: 0 },
    greyscale: false,
    rotate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [b64, setB64] = useState("");
  const [convertResult, setConvertResult] = useState(null);

  useEffect(() => {
    function convertBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
    if (file) {
      convertBase64(file).then((res) => {
        setB64(res);
      });
    }
    // getBase64(file).then((b64String) => {
    //   setB64(b64String);
    // });
  });

  useEffect(() => {
    // console.log(processOptions);
    setConvertResult(null);
  }, [processOptions]);

  useEffect(() => {
    if (b64) {
      // console.log(b64);
      let tmp = { ...processOptions };
      tmp.image = b64;
      setProcessOptions(tmp);
    }
  }, [b64]);

  useEffect(() => {
    if (fileFormatOption !== "...") {
      let tmp = { ...processOptions };
      tmp.format = fileFormatOption;
      setProcessOptions(tmp);
      setConvertResult(null);
    }
  }, [fileFormatOption]);

  const updateProcessOptions = (options) => {
    // console.log(options);
    setProcessOptions(options);
  };

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

  const handleDonePressed = async () => {
    setIsLoading(true);
    // let b64image = await getBase64(file);
    // setB64(b64image);
    let payload = {
      image: b64,
      rotate: parseInt(processOptions.rotate),
      flip: {
        x: processOptions.flipVertical,
        y: processOptions.flipHorizontal,
      },
      sharpen: {
        options: {
          sigma: 1,
          m1: parseInt(processOptions.sharpen / 100),
          m2: parseInt(processOptions.sharpen / 100) * 2,
          x1: parseInt(processOptions.sharpen / 100) * 2,
          y2: parseInt(processOptions.sharpen / 100) * 10,
          y3: parseInt(processOptions.sharpen / 100) * 20,
        },
      },
      median: {
        size: processOptions.median ? parseInt(processOptions.median) : null,
      },
      blur: {
        sigma: processOptions.blur ? parseInt(processOptions.blur) : null,
      },
      flatten: {
        options: {
          background: processOptions.flatten
            ? `#${processOptions.flatten}`
            : null,
        },
      },
      negate: {
        options: {
          alpha: processOptions.negate,
        },
      },
      normalise: processOptions.normalize,
      format:
        fileFormatOption.toLowerCase() === "..."
          ? null
          : fileFormatOption.toLowerCase(),
      resize: {
        width: processOptions.resize.width
          ? parseInt(processOptions.resize.width)
          : null,
        height: processOptions.resize.height
          ? parseInt(processOptions.resize.width)
          : null,
      },
      tint: {
        rgb: {
          r: parseInt(processOptions.tint.r),
          g: parseInt(processOptions.tint.g),
          b: parseInt(processOptions.tint.b),
        },
      },
      greyscale: processOptions.greyscale,
    };

    // console.log(payload);
    // console.log(JSON.stringify(payload));
    let response = await convertAPI(payload);
    // console.log(`response from api ${response}`);
    if (response !== null) {
      let b64ImageResult = response.output.image;
      setConvertResult({
        image: b64ImageResult,
        format: response.output.format,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-row h-[70px] items-center justify-around bg-[#215FF6] rounded-xl text-white font-semibold">
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
          value={fileFormatOption}
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
          <div className="absolute top-16 -left-[300px] z-50">
            <EditMenu file={file} onUpdate={updateProcessOptions} />
          </div>
        )}
      </div>
      {/* <button className="bg-black w-[100px] h-[40px] px-2 rounded-md text-[#215FF6] font-bold text-lg">
        Start
      </button> */}
      {isLoading ? (
        <ThreeCircles
          height="40"
          width="40"
          color="#040f35"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      ) : convertResult ? (
        <button
          className="w-[150px] h-[50px] text-black bg-white rounded-lg"
          onClick={() => {
            // console.log(convertResult.image);
            download(
              `data:image/${convertResult.format};base64,${convertResult.image}`,
              `convert${props.index}.${
                convertResult.format === "jpeg" ? "jpg" : convertResult.format
              }`,
              `image/${
                convertResult.format === "jpeg" ? "jpg" : convertResult.format
              }`
            );
            // var image = new Image();
            // image.src = `data:image/${convertResult.format};base64,${convertResult.image}`;
            // console.log(image);
          }}
        >
          Download
        </button>
      ) : (
        <button
          className="w-[150px] h-[50px] text-black bg-white rounded-lg"
          onClick={handleDonePressed}
        >
          Done
        </button>
      )}
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
