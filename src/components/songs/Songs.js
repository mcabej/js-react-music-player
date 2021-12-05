import { CardMedia, Stack, Typography, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Songs = () => {
  const tracks = useSelector((state) => state.tracks.data);

  return (
    <Stack>
      <Typography variant="h6">All Songs</Typography>
      {tracks.map((obj) => {
        return (
          <Stack direction="row" spacing={1}>
            {obj.title !== "" && (
              <Paper
                style={{
                  width: "100%",
                  height: 80,
                  borderRadius: 3,
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  boxSizing: "border-box",
                }}
              >
                <CardMedia image={obj.coverArt} sx={{ height: 70, width: 70, borderRadius: 1, mr: 1 }} />
                <Stack>
                  <Typography variant="subtitle1">{obj.title}</Typography>
                  <Typography variant="body2" style={{ fontSize: 11 }}>
                    {obj.artist}
                  </Typography>
                </Stack>
              </Paper>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Songs;
