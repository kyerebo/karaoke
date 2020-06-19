import React, { useState, useEffect } from "react";
import Download from "./download.js";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./edit.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Edit = ({ lyrics, handleLyricUpload, isPlaying }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [textarea, setTextarea] = useState(lyrics);

  useEffect(() => {
    setTextarea(lyrics);
  }, [lyrics]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setTextarea(e.target.value);
  };
  const handleSave = () => {
    handleLyricUpload(textarea);
    setOpen(false);
  };
  return (
    <div className="edit-container">
      <Button
        style={{ margin: "0 5px" }}
        variant="text"
        color="primary"
        onClick={handleOpen}
        disabled={isPlaying}
      >
        Edit Lyrics
      </Button>
      <Modal
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h4" color="textPrimary" id="edit-modal-title">
              Edit Lyrics
            </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              Type lyrics in the format:{" "}
              <b>
                [MM:SS.ss]<em>lyric here</em>
              </b>
            </Typography>
            <textarea
              className="lyrics-text"
              value={textarea}
              onChange={handleChange}
            />
            <Button
              className="save-button"
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginTop: "1rem", marginLeft: "1rem", float: "right" }}
            >
              Save
            </Button>
            <Download lyrics={textarea} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Edit;
