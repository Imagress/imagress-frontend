import React from 'react';
import styled from 'styled-components';
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
    const fileUploaded = event.target.files[0];
    // console.log(event.target.files[0]);
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick} className="w-[440px] h-[90px] rounded-lg border-2 bg-black text-[#215FF6] text-5xl font-bold justify-center align-middle items-center">
        Upload a file
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        className="hidden"
        accept='image/*'
        // style={{display: 'none'}}
      />
    </>
  );
}
export default FileUploader;