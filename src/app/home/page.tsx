"use client";
import React, { useEffect, useState } from "react";
import { getNewReleases, getSpotifyToken, getFeaturedPlaylists, getBrowseGenres } from "../../../services/http.services";
import MobileToggle from "@/app/MobileToggle";
import Menu from "@/app/Menu";
import SongList from "@/app/SongList";
import GenreList from "@/app/GenreList";
import "./styles.scss";

export default function HomePage() {
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [view, setView] = useState<string>("New Releases");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const views = ["New Releases", "Featured Playlist", "Browse Genres"];

  const handleClick = async (selectedView: string) => {
    if (view === selectedView && data.length > 0) return;

    setView(selectedView);
    setIsMenuOpen(false);

    switch (selectedView) {
      case "New Releases":
        setData(await getNewReleases() || []);
        break;
      case "Featured Playlist":
        setData(await getFeaturedPlaylists() || []);
        break;
      case "Browse Genres":
        setData(await getBrowseGenres() || []);
        break;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const tokenData = await getSpotifyToken();
      if (tokenData) {
        setToken(tokenData);
        const newReleases = await getNewReleases();
        setData(newReleases || []);
      }
    };
    fetchToken();
  }, []);

  return (
    <div className="container">
      <h1 className="title">{view}</h1>

      <MobileToggle isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      <Menu views={views} currentView={view} isOpen={isMenuOpen} onSelect={handleClick} />

      {view === "New Releases" && data.length > 0 && <SongList songs={data} />}
      {view === "Browse Genres" && data.length > 0 && <GenreList genres={data} />}
    </div>
  );
}
