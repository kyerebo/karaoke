import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import "./player.css";

const Player = ({ currentTime, updateCurrentTime, audio }) => {
  const [control, setControl] = useState(<PlayArrowIcon />);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const music = document.getElementById("audio");

  useEffect(() => {
    if (audio !== null) {
      music.src = URL.createObjectURL(audio);
      music.onloadedmetadata = function () {
        setDuration(music.duration);
      };
      setIsLoaded(true);
    }
  }, [audio, music]);

  const updateScrubber = () => {
    updateCurrentTime(music.currentTime);
  };

  const handleChange = (event, newValue) => {
    music.currentTime = newValue;
  };

  const handlePlayPause = () => {
    if (music != null) {
      if (music.paused === true) {
        music.play();
        setControl(<PauseIcon />);
      } else {
        music.pause();
        setControl(<PlayArrowIcon />);
      }
    }
  };
  if (audio !== null) {
    setInterval(updateScrubber, 500);
  }
  return (
    <div className="player-container">
      <audio id="audio" />
      <Grid
        className="scrubber-container"
        container
        spacing={2}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60) < 10
            ? "0" + Math.floor(currentTime % 60)
            : Math.floor(currentTime % 60)}
        </Grid>
        <Grid item>
          <Slider
            style={{ width: 550 }}
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleChange}
            disabled={!isLoaded}
          />
        </Grid>
        <Grid item>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60) < 10
            ? "0" + Math.floor(duration % 60)
            : Math.floor(duration % 60)}
        </Grid>
      </Grid>
      <IconButton
        aria-label="play/pause"
        onClick={handlePlayPause}
        disabled={!isLoaded}
      >
        {control}
      </IconButton>
    </div>
  );
};
export default Player;
