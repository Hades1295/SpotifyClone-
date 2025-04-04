import React from "react";

interface Props {
  songs: any[];
}

export default function SongList({ songs }: Props) {
  return (
    <ul className="song-list">
      {songs.map((item) => (
        <li key={item.id} className="song-item">
          <img src={item.images?.[0]?.url} alt={item.name} className="song-image" />
          <div className="song-info">
            <p className="song-name">{item.name}</p>
            <p className="artist-name">{item.artists?.map((artist) => artist.name).join(", ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
