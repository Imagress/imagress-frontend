import React, { useState } from "react";
import EditButton from "./components/edit-button";
import FileUploader from "./components/file-uploader";
import HorizontalLine from "./components/horizontal-line";
import ImagressLogo from "./components/imagress-logo";
import ProcessButton from "./components/process-button";
import ProcessingComponent from "./components/processing/processing";

function App() {
  const [pickedFiles, setPickedFiles] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const isFileImage = (file) => {
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    return file && acceptedImageTypes.includes(file["type"]);
  };

  const handleFilePick = (files) => {
    setPickedFiles(files);
  };

  const clearFiles = () => {
    setPickedFiles([]);
  };

  const handleEditClick = () => {
    if (pickedFiles.length > 0) {
      setShowEdit(true);
    }
  };

  const updateFileList = (files) => {
    if (files.length === 0) {
      setShowEdit(false);
    }
    setPickedFiles(files);
  };

  return (
    <div className="w-full flex flex-col items-center overflow-clip px-10 gap-5 py-10">
      <div className="cursor-pointer" onClick={clearFiles}>
        <ImagressLogo />
      </div>
      <div className="w-full h-[500px] bg-[#215FF6] rounded-3xl flex justify-around px-16">
        <div className="flex h-full">
          <FileUploader handleFile={handleFilePick} />
        </div>
        <HorizontalLine />
        <div className="flex h-full">
          <EditButton
            enabled={pickedFiles.length > 0}
            onClick={handleEditClick}
          />
          <HorizontalLine />
        </div>
        <div className="flex h-full">
          <ProcessButton enabled={false} />
        </div>
      </div>

      {showEdit && (
        <ProcessingComponent
          files={pickedFiles}
          updateFileList={updateFileList}
        />
      )}
    </div>
  );
}

export default App;
