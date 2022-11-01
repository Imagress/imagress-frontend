import React from "react";
import FileUploader from "./components/file-uploader";
import ImagressLogo from "./components/imagress-logo";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center overflow-clip">
      <ImagressLogo />
      <FileUploader
        handleFile={(file) => {
          console.log(`file: ${file}`);
        }}
      />
    </div>
  );
}

export default App;
