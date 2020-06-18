import React from "react";
import "./lyrics.css";

const Lyrics = ({ lrc, currentTime }) => {
  const lyricList = lrc.substr(lrc.indexOf("[0")).split("\r\n");
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
            return <mark id="highlight">{line.substr(10) + "\n"}</mark>;
          }
        } else {
          if (lineSeconds <= currentTime && currentTime <= lineSeconds + 10) {
            return <mark id="highlight">{line.substr(10) + "\n"}</mark>;
          }
        }
        if (document.getElementById("highlight") !== null) {
          document.getElementById("highlight").scrollIntoView({
            block: "center",
            inline: "center",
          });
        }
        return line.substr(10) + "\n";
      })}
    </div>
  );
};
export default Lyrics;
