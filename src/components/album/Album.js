import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const Album = () => {
  const tracks = useSelector((state) => state.tracks.data).filter((item) => item.title !== "");
  const unique = [
    ...new Map(
      tracks
        .slice()
        .reverse()
        .map((v) => [v.album, v])
    ).values(),
  ].reverse();

  return (
    <Grid container columnGap={1} rowGap={1}>
      {unique.map((obj) => {
        return (
          <Grid item xs={4}>
            <Card sx={{ height: "100%", borderRadius: 1 }}>
              <CardMedia image={obj.coverArt} sx={{ height: 100 }} />
              <CardContent>
                <Typography variant="h6">{obj.album}</Typography>
                <Typography variant="body2">{obj.artist}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Album;
