import React from "react";
import ProcessButtonDisabled from "../svg/process-disabled.svg";
import ProcessButtonEnabled from "../svg/process.svg";
import ItemContainer from "./item-container";
import styled from "styled-components";

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`;
const ProcessButton = (props) => {
  const handleClick = () => {};
  return (
    <ItemContainer
      children={
        <>
          <img
            src={props.enabled ? ProcessButtonEnabled : ProcessButtonDisabled}
            alt="edit"
            className="cursor-pointer"
            onClick={handleClick}
          />
          <Button
            onClick={handleClick}
            className={`w-[300px] h-[80px] bg-white ${
              props.enabled ? "opacity-100" : "opacity-50"
            } text-black font-bold text-[32px] rounded-xl`}
          >
            Imagress!
          </Button>
        </>
      }
    />
  );
};

export default ProcessButton;
