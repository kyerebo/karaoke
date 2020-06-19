import React from "react";
import "./lyrics.css";
import Typography from "@material-ui/core/Typography";

const Lyrics = ({ lyrics, currentTime, setUpdateTime }) => {
  var lyricList = "";
  if (lyrics.search(/\[[0-9]/) !== -1) {
    lyricList = lyrics.substr(lyrics.search(/\[[0-9]/)).split("\n");
  } else {
    lyricList = lyrics.split("\r\n");
  }
  const handleLyricClick = (time) => {
    setUpdateTime(time);
  };
  return (
    <div id="lyrics-container" className="lyrics-container">
      {lyricList.map((line, i, arr) => {
        let lineSeconds =
          parseInt(line.substr(1, 2)) * 60 + parseInt(line.substr(4, 2));
        if (i + 1 !== arr.length) {
          let nextLineSeconds =
            parseInt(arr[i + 1].substr(1, 2)) * 60 +
            parseInt(arr[i + 1].substr(4, 2));
          if (lineSeconds <= currentTime && currentTime <= nextLineSeconds) {
            return (
              <Typography variant="body1" id="highlight" color="textPrimary">
                <b>{line.substr(10) + "\n"}</b>
              </Typography>
            );
          }
        } else {
          if (lineSeconds <= currentTime && currentTime <= lineSeconds + 10) {
            return (
              <Typography variant="body1" id="highlight" color="textPrimary">
                <b>{line.substr(10) + "\n"}</b>
              </Typography>
            );
          }
        }
        if (document.getElementById("highlight") !== null) {
          document.getElementById("highlight").scrollIntoView({
            block: "center",
            inline: "center",
          });
        }
        if (lyrics.search(/\[[0-9]/) === -1) {
          return (
            <Typography variant="body1" color="textSecondary">
              {line + "\n"}
            </Typography>
          );
        }
        return (
          <Typography
            variant="body1"
            color="textSecondary"
            id={lineSeconds}
            onClick={() => handleLyricClick(lineSeconds)}
          >
            {line.substr(10) + "\n"}
          </Typography>
        );
      })}
    </div>
  );
};
export default Lyrics;
