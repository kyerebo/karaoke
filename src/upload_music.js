import React from "react";
import Button from "@material-ui/core/Button";

const uploadMusic = ({ handleMusicUpload }) => {
  const onFileChange = (e) => {
    handleMusicUpload(e.target.files[0]);
  };
  return (
    <Button variant="contained" color="primary" component="label">
      Upload MP3 or WAV
      <input
        type="file"
        accept=".mp3,.wav"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </Button>
  );
};
export default uploadMusic;
