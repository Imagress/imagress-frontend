import React, { useState } from "react";
import FileUploader from "./components/file-uploader";
import ImagressLogo from "./components/imagress-logo";
import ProcessingComponent from "./components/processing/processing";

function App() {
  const [pickedFile, setPickedFile] = useState(null);

  const isFileImage = (file) => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file["type"]);
  };

  const handleFilePick = (file) => {
    console.log(file);
    if (isFileImage(file)) {
      setPickedFile(file);
    } else {
      setPickedFile(null);
    }
    console.log(isFileImage(file));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center overflow-clip">
      <ImagressLogo />
      {!pickedFile && <FileUploader handleFile={handleFilePick} />}
      {pickedFile && <ProcessingComponent file={pickedFile}/>}
    </div>
  );
}

export default App;
