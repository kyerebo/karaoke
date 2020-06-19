import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import UploadMusic from "./upload_music.js";
import UploadLyrics from "./upload_lyrics.js";
import Lyrics from "./lyrics.js";
import Player from "./player.js";
import Edit from "./edit.js";
import Autofill from "./autofill.js";
import "./App.css";

function App() {
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [lyrics, setLyrics] = useState(
    "[00:00.00]Upload music and lyrics to get started!"
  );
  const [updateTime, setUpdateTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMusicUpload = (file) => {
    setAudio(file);
  };
  const handleLyricUpload = (file) => {
    setLyrics(file);
  };
  const updateCurrentTime = (time) => {
    setCurrentTime(time);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#18bc9c",
        contrastText: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <UploadMusic
          handleMusicUpload={handleMusicUpload}
          isPlaying={isPlaying}
        />
        <Autofill audio={audio} setLyrics={setLyrics} isPlaying={isPlaying} />
        <UploadLyrics
          handleLyricUpload={handleLyricUpload}
          isPlaying={isPlaying}
        />
        <Edit
          lyrics={lyrics}
          handleLyricUpload={handleLyricUpload}
          isPlaying={isPlaying}
        />
        <Lyrics
          lyrics={lyrics}
          currentTime={currentTime}
          setUpdateTime={setUpdateTime}
        />
        <Player
          currentTime={currentTime}
          updateCurrentTime={updateCurrentTime}
          audio={audio}
          updateTime={updateTime}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
