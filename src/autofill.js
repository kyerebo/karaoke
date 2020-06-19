import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    height: "10em",
    width: "15em",
  },
}));

const Autofill = ({ audio, setLyrics, isPlaying }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    var jsmediatags = require("jsmediatags");
    var songTitle = "";
    var songArtist = "";
    jsmediatags.read(audio, {
      onSuccess: function (tag) {
        songTitle = tag.tags.title;
        songArtist = tag.tags.artist;
        axios
          .get(
            `https://lyric-api.herokuapp.com/api/find/` +
              encodeURIComponent(songArtist) +
              "/" +
              encodeURIComponent(songTitle)
          )
          .then((res) => {
            const lyric = res.data.lyric;
            const error = res.data.err;
            if (error === "none") {
              setLyrics(lyric);
            } else {
              alert("The lyrics for this song are not in the database!");
            }
          });
      },
      onError: function (error) {
        alert(
          "Could not retrieve file information, please upload lyrics or try another music file."
        );
      },
    });
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: "inline" }}>
      <Button
        style={{ margin: "0 5px" }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}
        variant="text"
        color="primary"
        disabled={audio === null || isPlaying}
      >
        Autofill Lyrics
      </Button>
      <Popover
        id="mouse-over-popover"
        open={open}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <p>
          Attempt to auto-upload lyrics based on available information in the
          currently uploaded music file. You will still have to use the "Edit
          Lyrics" function to add timestamps to the lyrics!
        </p>
      </Popover>
    </div>
  );
};
export default Autofill;
