import React, { Fragment } from "react";
import FileRow from "./file-row";

const ProcessingComponent = (props) => {
  console.log(props.files);
  var files = Array.from(props.files);

  const removeFile = (file) => {
    // console.log(`remove: ${file}`);
    // files = files.filter((e) => e !== file);
    const index = files.indexOf(file);
    if (index > -1) {
      // console.log(index);
      files.splice(index, 1);
    }
    props.updateFileList(files);
  };

  return (
    <div className="w-full h-[750px] bg-[#040F35] rounded-3xl px-10 py-5 gap-3 flex flex-col overflow-y-scroll">
      {files.map((file, index) => {
        return (
          <Fragment key={index}>
            <FileRow file={file} onRemove={removeFile} index={index}/>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProcessingComponent;
