import { AddBox } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { UpdatePlaylist } from "../../redux/actions/playlist";

let newPlaylist = { name: "", tracks: [] };

const CreatePlaylist = () => {
  const tracks = useSelector((state) => state.tracks.data).filter((obj) => obj.title !== "");

  const [open, setOpen] = useState("name");
  const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();
  const nameRef = useRef();
  const dispatch = useDispatch();

  const addName = () => {
    let temp = newPlaylist;
    temp.name = nameRef.current.value;
    newPlaylist = { ...temp };
    setOpen("songs");
  };

  const addSongs = (track) => {
    newPlaylist.tracks.push(track);
    setOpenSnack(true);
  };

  const createPlaylist = () => {
    if (newPlaylist.tracks.length > 0) {
      dispatch(UpdatePlaylist(newPlaylist));
      navigate("/");
    }
  };

  return (
    <>
      {open === "name" ? (
        <Stack sx={{ mt: 1 }} spacing={3}>
          <Typography variant="subtitle1" textAlign="center">
            Give your playlist a name
          </Typography>
          <TextField placeholder="Playlist name..." inputRef={nameRef} />
          <Stack direction="row" spacing={1} style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button variant="contained" onClick={addName}>
              Next
            </Button>
          </Stack>
        </Stack>
      ) : (
        <TableContainer>
          <Typography variant="h5" textAlign="center">
            {newPlaylist.name}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>ARTIST</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={createPlaylist}>
                    Finish
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((obj, i) => {
                return (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{obj.title}</TableCell>
                    <TableCell>{obj.artist}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => addSongs(obj)}>
                        <AddBox />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={openSnack} onClose={() => setOpenSnack(false)} autoHideDuration={500} message={"Song added to playlist"} />
    </>
  );
};

export default CreatePlaylist;
