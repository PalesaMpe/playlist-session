import React, { PureComponent, useEffect, useState } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";

export default function Player({ accessToken, trackUri }) {
  const [Play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);
  // if (!accessToken) return null;
  return (
    <SpotifyWebPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (state.isPlaying) {
          setPlay(false);
        }
      }}
      play={Play}
      uris={trackUri ? trackUri : []}
      initialVolume
    />
  );
}
