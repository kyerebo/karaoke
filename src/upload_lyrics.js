import React from "react";
import Button from "@material-ui/core/Button";

const uploadLyrics = ({ handleLyricUpload }) => {
  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };
  const onFileChange = (e) => {
    readFileContent(e.target.files[0])
      .then((content) => {
        handleLyricUpload(content);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Button variant="contained" color="primary" component="label">
      Upload Lyric (LRC) file
      <input
        type="file"
        onChange={onFileChange}
        accept=".lrc"
        style={{ display: "none" }}
      />
    </Button>
  );
};
export default uploadLyrics;
