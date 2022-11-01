import React from "react";
import FileRow from "./file-row";

const ProcessingComponent = (props) => {
  console.log(props.files);
  var files = Array.from(props.files);
  return (
    <div className="w-[1130px] h-[500px] bg-transparent border-2 border-[#898989] rounded-lg">
      {files.map((file) => {
        return <FileRow file={file} />;
      })}
    </div>
  );
};

export default ProcessingComponent;
