import React from "react";
import styled from "styled-components";
import UploadIcon from "../svg/upload.svg";
import ItemContainer from "./item-container";
// Style the Button component
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`;
const FileUploader = (props) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    // console.log(event.target.files[0]);
    props.handleFile(fileUploaded);
  };
  return (
    <ItemContainer
      children={
        <>
          <img
            src={UploadIcon}
            alt="upload"
            className="cursor-pointer"
            onClick={handleClick}
          />
          <Button
            onClick={handleClick}
            className="w-[300px] h-[80px] bg-white text-black font-bold text-[32px] rounded-xl"
          >
            Upload File
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            className="hidden"
            accept="image/*"
            multiple={true}
            // style={{display: 'none'}}
          />
        </>
      }
    />
  );
};
export default FileUploader;
