import React, { useState } from "react";
import UploadMusic from "./upload_music.js";
import UploadLyrics from "./upload_lyrics.js";
import Lyrics from "./lyrics.js";
import Player from "./player.js";
import "./App.css";

function App() {
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [lyrics, setLyrics] = useState(
    "[00:00.00]Upload lyrics, and/or upload music and auto-fill lyrics to get started!"
  );

  const handleMusicUpload = (file) => {
    setAudio(file);
  };
  const handleLyricUpload = (file) => {
    setLyrics(file);
  };
  const updateCurrentTime = (time) => {
    setCurrentTime(time);
  };
  return (
    <div className="App">
      <UploadMusic handleMusicUpload={handleMusicUpload} />
      <UploadLyrics handleLyricUpload={handleLyricUpload} />
      <Lyrics lrc={lyrics} currentTime={currentTime} />
      <Player
        currentTime={currentTime}
        updateCurrentTime={updateCurrentTime}
        audio={audio}
      />
    </div>
  );
}

export default App;
