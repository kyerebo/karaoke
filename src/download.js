import React from "react";
import Button from "@material-ui/core/Button";

const Download = ({ lyrics }) => {
  const handleClick = () => {
    const element = document.createElement("a");
    const file = new Blob([lyrics], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "lyrics.lrc";
    document.body.appendChild(element);
    element.click();
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      style={{ marginTop: "1rem", float: "right" }}
    >
      Download LRC
    </Button>
  );
};
export default Download;
