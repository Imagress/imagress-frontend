import React, { useState } from "react";
import FileUploader from "./components/file-uploader";
import ImagressLogo from "./components/imagress-logo";
import ProcessingComponent from "./components/processing/processing";

function App() {
  const [pickedFiles, setPickedFiles] = useState([]);

  const isFileImage = (file) => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file["type"]);
  };

  const handleFilePick = (files) => {
    // console.log(files);
    setPickedFiles(files);
    // if (isFileImage(files)) {
      // setPickedFiles(files);
    // } else {
      // setPickedFiles(null);
    // }
    // console.log(isFileImage(files));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center overflow-clip">
      <ImagressLogo />
      {pickedFiles.length === 0 && <FileUploader handleFile={handleFilePick} />}
      {pickedFiles.length > 0 && <ProcessingComponent files={pickedFiles} />}
    </div>
  );
}

export default App;
