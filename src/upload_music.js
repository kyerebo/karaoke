import React from "react";
import Button from "@material-ui/core/Button";

const uploadMusic = ({ handleMusicUpload, isPlaying }) => {
  const onFileChange = (e) => {
    if (e.target.files[0] !== undefined) {
      handleMusicUpload(e.target.files[0]);
    }
  };
  return (
    <Button
      style={{ margin: "0 5px" }}
      variant="contained"
      color="primary"
      component="label"
      disabled={isPlaying}
    >
      Upload MP3/WAV
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
