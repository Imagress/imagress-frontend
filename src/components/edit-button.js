import React from "react";
import ItemContainer from "./item-container";
import EditIconDisabled from "../svg/edit-disabled.svg";
import EditIconEnabled from "../svg/edit.svg";
import styled from "styled-components";

const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
`;
const EditButton = (props) => {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <ItemContainer
      children={
        <>
          <img
            src={props.enabled ? EditIconEnabled : EditIconDisabled}
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
            Edit
          </Button>
        </>
      }
    />
  );
};
export default EditButton;
