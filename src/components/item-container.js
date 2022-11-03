import React from "react";

const ItemContainer = (props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {props.children}
    </div>
  );
};

export default ItemContainer;
